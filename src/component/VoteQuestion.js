import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';

const useStyles = makeStyles({
  title: {
    color: 'white',
    fontWeight: 'bolder',
  },
  button: {
    border: '1px solid white',
    color: 'white',
    margin: '10px',
  },
  label: {
    color: 'white',
  },
  selectedLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  textField: {
    background: '#e3c2f2',
  },
  input: {
    color: 'purple',
    padding: '5px',
  },
});

const WhiteRadio = withStyles({
  root: {
    color: 'white',
    '&checked': {
      color: 'white',
    },
  },
// eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Radio color="default" {...props} />);

const VoteQuestion = ({ voteCampaignDetail, checkResult, setMyVote }) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState('');
  const [hkidValue, setHkidValue] = useState('');
  const [voteError, setVoteError] = useState('');
  const {
    campaign_id: campaginId = '',
    options = [],
  } = voteCampaignDetail;

  const submitVote = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/vote/${campaginId}/`,
        qs.stringify({ hkid: hkidValue, option_code: selectedOption }),
      );
      setMyVote(selectedOption);
      setVoteError('');
      checkResult();
    } catch (error) {
      setVoteError(error.response.data.detail);
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <FormControl component="fieldset">
          <RadioGroup name={`${campaginId}`} value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
            {
              options.map((option) => (
                <FormControlLabel
                  key={option.option_code}
                  value={option.option_code}
                  control={<WhiteRadio />}
                  label={(
                    <Typography
                      className={option.option_code === selectedOption
                        ? classes.selectedLabel : classes.label}
                    >
                      {`${option.option_code}. ${option.option_detail}`}
                    </Typography>
                    )}
                />
              ))
            }
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <TextField
          className={classes.textField}
          InputProps={{ className: classes.input, disableUnderline: true }}
          placeholder="HKID"
          value={hkidValue}
          onChange={(event) => setHkidValue(event.target.value)}
        />
        <Button
          className={classes.button}
          disabled={!selectedOption || !hkidValue}
          onClick={submitVote}
        >
          Submit
        </Button>
      </Grid>
      {
        voteError && (
          <Grid item>
            <Typography variant="caption" color="secondary">
              {voteError === 'INVALID_INPUT' && 'Incorrect ID.'}
              {voteError === 'ALREADY_VOTE' && 'You have voted in this campaign.'}
              {(voteError !== 'INVALID_INPUT' && voteError !== 'ALREADY_VOTE') && 'Some error occurs.'}
            </Typography>
          </Grid>
        )
      }
      <Grid item>
        <Button className={classes.button} onClick={checkResult}>Result</Button>
      </Grid>
    </Grid>
  );
};

VoteQuestion.propTypes = {
  voteCampaignDetail: PropTypes.shape({
    campaign_id: PropTypes.number.isRequired,
    options: PropTypes.shape({
      option_code: PropTypes.string.isRequired,
      option_detail: PropTypes.string.isRequired,
    }),
  }).isRequired,
  checkResult: PropTypes.func.isRequired,
  setMyVote: PropTypes.func.isRequired,
};
export default VoteQuestion;
