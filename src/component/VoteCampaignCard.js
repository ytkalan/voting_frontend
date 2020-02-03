import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

const VotingCampaignCard = ({votingCampaignData}) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const {
    campaign_id,
    question,
    start_time,
    end_time,
    is_active_campaign,
    number_of_vote
  } = votingCampaignData;

  return (
    <Paper className={classes.paperRoot} variant='outlined'>
      {redirect && <Redirect to={`/${campaign_id}`} />}
      <Typography className={classes.question} variant='h5' align='center'>
        {question}
      </Typography>
      <Typography className={classes.detail} variant='body1' align='center'>
        {`Voting period from ${new Date(`${start_time}Z`).toLocaleDateString("en-US")} to ${new Date(`${end_time}Z`).toLocaleDateString("en-US")}`}
      </Typography>
      <Typography className={classes.detail} variant='body1' align='center'>
        {`Total number of vote: ${number_of_vote}`}
      </Typography>
      <Typography className={classes.detail} variant='body1' align='center'>
        {is_active_campaign ? 'You can still vote in this campaign.' : 'The vote campaign has closed.'}
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item>
          <Button className={classes.button} variant='outlined' onClick={()=>setRedirect(true)}>
            {is_active_campaign ? 'Vote' : 'See Result'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default VotingCampaignCard;
