import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Colors from "../../utils/Colors"
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    app: {
        position: "absolute",
        left: "50%",
        top: "50%",
        webkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)"
    }
    
});

class EndGame extends Component {
  render() {
    const { classes, } = this.props;
    return (
      <div className={classes.app}>
        <Typography 
            variant="h3" 
            gutterBottom>
            The End
        </Typography>
      </div>
    )
  }
}


EndGame.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(EndGame);