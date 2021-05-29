import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/im2.jpeg';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

function App() {
    
  const AlanKey = '883ceb061acd26b0d048ee2c876014b82e956eca572e1d8b807a3e2338fdd0dc/stage';
  
  const alanBtnInstance = useRef(null);
  // const newsArticles = useRef([]);
  const [news, setNews] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);


  const classes = useStyles();

  useEffect(() => {

    //creating alan btn

    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: AlanKey,
        onCommand: ({ command, articles,number}) => {

          if (command === 'newHeadlines') {
            // newsArticles.current = articles;
            setNews(articles);
            setActiveArticle(-1);
          }
          else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          }
          else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      });
    }
    }, []);


  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={logo} className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={news} activeArticle={activeArticle} />
      
      {!news.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/shubham43245/">Shubham Gupta</a>
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

export default App;