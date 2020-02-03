import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const WhiteRadio = withStyles({
  root: {
    color: 'white',
    '&checked': {
      color: 'white',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Radio color="default" {...props} />);

export default WhiteRadio;
