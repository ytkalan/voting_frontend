import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import VoteCampaignCard from './VoteCampaignCard';
import { ErrorDetail } from '../constant';

const useStyles = makeStyles({
  root: {
    padding: '10%',
    minWidth: '320px',
  },
  title: {
    color: 'white',
    fontWeight: 'bolder',
  },
  carousel: {
    padding: '30px',
  },
});

const Home = () => {
  const classes = useStyles();
  const [voteCampaignList, setvoteCampaignList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/campaign/`);
        setvoteCampaignList(response.data);
      } catch (error) {
        setErrorMessage('unknown error');
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5" align="center" gutterBottom>
        Vote Campaign
      </Typography>
      {errorMessage ? (
        <Typography variant="body1" color="secondary" align="center">
          {ErrorDetail.unknwonError}
        </Typography>
      ) : (
        <Carousel className={classes.carousel} autoPlay={false}>
          {
            voteCampaignList.map((data) => (
              <VoteCampaignCard key={`${data.campaign_id}`} votingCampaignData={data} />
            ))
          }
        </Carousel>
      )}
    </div>
  );
};

export default Home;
