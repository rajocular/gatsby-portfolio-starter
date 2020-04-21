import React, { useState, useEffect } from "react"
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { StaticQuery, graphql } from 'gatsby';
import Lottie from 'react-lottie';

import * as animationData from '../../static/loader.json';
import '../../static/styles.css';

const query = graphql`
  query{
    sitePage {
      component
    }
  }
`;

const useStyles = makeStyles({
  animationContainer: {
    height: '100vh',
    alignItems: 'center',
    backgroundColor: '#2874A6'
  },
});

const HomePage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  async function onRender() {
    await setTimeout(() => setLoading(false), 4000);
  };

  useEffect(() => {
    onRender();
  }, []);

  return (
    <Grid container>
      {loading
        ? (
        <Grid container className={classes.animationContainer}>
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            isStopped={!loading}
          />
        </Grid>
        )
        : (
        <StaticQuery
          query={query}
          render={data => {
              return (
                <Typography>
                  Hola! You're in
                </Typography>
              );
            }
          }
        />
        )
      }
    </Grid>
  );
}

export default HomePage;
