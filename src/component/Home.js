
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import VoteCampaignCard from './VoteCampaignCard';

const useStyles = makeStyles({
  root: {
    padding: '10% 15% 0% 15%',
    minWidth: '300px',
    maxHeight: '90%',
  },
  title: {
    color: 'white',
    fontWeight: 'bolder',
  },
  carousel: {
    padding: '30px',
  }
});

const Home = () => {
  const classes = useStyles();
  const [voteCampaignList, setvoteCampaignList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/campaign/`);
        await setvoteCampaignList(response.data);
      } catch (error) {
        setErrorMessage('unknown error');
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='h5' align='center' gutterBottom>
        {'Vote Campaign'}
      </Typography>
      {
        !errorMessage && (
          <Carousel className={classes.carousel} autoPlay={false}>
            {
              voteCampaignList.map(data => (
                <VoteCampaignCard key={`${data.campaign_id}`}votingCampaignData={data}/>
              ))
            }
          </Carousel>
        )
      }
      {
        errorMessage && (
          <Typography variant='body1' color='secondary' align='center'>
            {'Some errors occur. Please try again later.'}
          </Typography>
        )
      }
    </div>
  );
}

export default Home;

