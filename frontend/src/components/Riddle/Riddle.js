import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Colors from "../../utils/Colors"


const styles = theme => ({
    root: {
        position:"fixed",
        padding:"0",
        margin:"0",
        top:"0",
        left:"0",
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    title: {
    },
    app: {
        position: "absolute",
        left: "50%",
        top: "50%",
        webkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      },
    content : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        marginBottom: "10%",
    },
    imageContainer : {
        margin: "5%",
        height: "500px",
        width: "500px",
        alignContent: "center"
    },
    input: {
        margin: "3%",
    }
    
});

class Riddle extends React.Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this)
        this.changeAnswer = this.changeAnswer.bind(this)
        this.state = {
            answer: null
        }
    }

    changeAnswer(e){
        this.setState({
            answer: e.target.value
        })
    }
    renderImage(){
        if (this.props.isLoading){
            return (
                <CircularProgress 
                />
            )
        }
        return (
                <img
                    className={this.props.classes.image}
                    height="100%"
                    width="100%"
                    src={this.props.image}
                    alt= "Not found"
                />
        )
    }
    render() {
        const { classes, sendResult, curStage, label } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.app}>
                    <div className={classes.content}>
                        <Typography 
                            className={classes.title}
                            variant="h3" 
                            gutterBottom>
                            {"Stage " + (curStage + 1).toString()}
                        </Typography>
                        <div className={classes.imageContainer} >
                            {this.renderImage()}
                        </div>
                        <Typography 
                            className={classes.title}
                            variant="h5" 
                            gutterBottom>
                            {label}
                        </Typography>
                        <TextField
                            className={classes.input}
                            label="Answer"
                            variant="outlined"
                            onChange={this.changeAnswer}
                        />
                        <Button 
                            variant="contained"
                            onClick={() => sendResult(this.state.answer)}
                            color="primary">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        );
  }
}

Riddle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Riddle);