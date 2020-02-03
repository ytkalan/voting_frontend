
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  label: {
    color: 'white',
    textAlign: 'center',
  },
});

const VoteResult = ({ voteCampaignDetail, myVote }) => {
  const classes = useStyles();
  const {
    options = [],
  } = voteCampaignDetail;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {
        options.map((option) => (
          <Grid key={`${option.option_code}`} item container justify="center" alignItems="center">
            <Grid item xs={4}>
              <Typography className={classes.label}>
                {`${option.option_code}. ${option.option_detail}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.label}>
                {`Vote: ${option.number_of_vote}`}
                {' '}
                {myVote === option.option_code && '(Your Vote)'}
              </Typography>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  );
};

VoteResult.propTypes = {
  voteCampaignDetail: PropTypes.shape({
    campaign_id: PropTypes.number.isRequired,
    options: PropTypes.shape({
      option_code: PropTypes.string.isRequired,
      option_detail: PropTypes.string.isRequired,
    }),
  }).isRequired,
  myVote: PropTypes.string.isRequired,
};

export default VoteResult;
