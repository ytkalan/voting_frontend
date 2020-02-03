
import React, { useState, useEffect } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import VoteResult from './VoteResult';
import VoteQuestion from './VoteQuestion';

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
  mainItem: {
    padding: '10px',
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    border: '1px solid white',
    color: 'white',
  }
});

const VoteDetail = () => {
  const classes = useStyles();
  const [voteCampaign, setVoteCampaign] = useState({});
  const [myVote, setMyVote] = useState('');
  const [checkResult, setCheckResult] = useState(false);
  const [returnHome, setReturnHome] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const match = useRouteMatch('/:campaign_id');
  const { params: { campaign_id: campaignId }} = match;
  const { question } = voteCampaign;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/campaign/${campaignId}/`,
        );
        setErrorMessage('');
        setVoteCampaign(response.data);
      } catch (error) {
        setErrorMessage(error.response.data.detail);
      }
    }
    fetchData();
  }, [campaignId, checkResult]);

  const detailComponent = voteCampaign.is_active_campaign !== true || checkResult === true ? (
    <VoteResult
      voteCampaignDetail={voteCampaign}
      back={() => setReturnHome(true)}
      myVote={myVote}
    />
  ) : (
    <VoteQuestion
      voteCampaignDetail={voteCampaign}
      checkResult={()=>setCheckResult(true)}
      setMyVote={optionCode => setMyVote(optionCode)}
      back={() => setReturnHome(true)}
    />
  )
  return (
    <div className={classes.root}>
      {returnHome && <Redirect to='/' />}
      <Typography className={classes.title} variant='h5' align='center' gutterBottom>
        {`Camapign ${campaignId}`}
      </Typography>
      {errorMessage && (
        <Typography className={classes.errorMessage} variant='body1' align='center' gutterBottom>
          {errorMessage === 'NOT_FOUND' ? (
            'Campaign does not exist.'
          ) : (
            'Some errors occur.'
          )}
        </Typography>
      )}
      {!errorMessage && (
        <Typography className={classes.errorMessage} variant='h5' align='center' gutterBottom>
          {question}
        </Typography>
      )}
      {!errorMessage && (
        <div className={classes.mainItem}>{detailComponent}</div>
      )}
      <Grid container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <Button className={classes.button} variant='outlined' onClick={() => setReturnHome(true)}>
            {'Back'}
          </Button>
        </Grid>
      </Grid>
      
    </ div>
  );
}

export default VoteDetail;
