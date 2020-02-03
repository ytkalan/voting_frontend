import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CampaignStatus } from '../constant';

const useStyles = makeStyles({
  paperRoot: {
    height: '100%',
    minWidth: '200px',
    background: 'transparent',
    borderColor: 'white',
    borderRadius: '10px',
    borderStyle: 'solid',
    padding: '3%',
  },
  question: {
    color: 'white',
    paddingBottom: '15px',
  },
  detail: {
    color: 'white',
    paddingBottom: '7px',
  },
  button: {
    border: '1px solid white',
    color: 'white',
    margin: '20px',
    align: 'center',
  },
});

const VotingCampaignCard = ({ votingCampaignData }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const {
    campaign_id: campaignId,
    question,
    start_time: startTime,
    end_time: endTime,
    status,
    number_of_vote: numberOfVote,
  } = votingCampaignData;

  return (
    <Paper className={classes.paperRoot} variant="outlined">
      {redirect && <Redirect to={`/${campaignId}`} />}
      <Typography className={classes.question} variant="h5" align="center">
        {question}
      </Typography>
      <Typography className={classes.detail} variant="body1" align="center">
        {`Voting period from ${new Date(`${startTime}Z`).toLocaleDateString('en-US')} to ${new Date(`${endTime}Z`).toLocaleDateString('en-US')}`}
      </Typography>
      <Typography className={classes.detail} variant="body1" align="center">
        {`Total number of vote: ${numberOfVote}`}
      </Typography>
      <Typography className={classes.detail} variant="body1" align="center">
        {status === CampaignStatus.active && 'You can still vote in this campaign.'}
        {status === CampaignStatus.closed && 'This campaign has ended.'}
        {status === CampaignStatus.notStart && 'This campaign will start later.'}
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Button className={classes.button} variant="outlined" onClick={() => setRedirect(true)}>
            {status === CampaignStatus.active ? 'Vote' : 'Detail'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

VotingCampaignCard.propTypes = {
  votingCampaignData: PropTypes.shape({
    campaign_id: PropTypes.number,
    question: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    status: PropTypes.string,
    number_of_vote: PropTypes.number,
  }).isRequired,
};

export default VotingCampaignCard;
