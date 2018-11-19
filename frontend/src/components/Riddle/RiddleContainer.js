import React, { Component } from 'react'
import Riddle from './Riddle'
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import EndGame from '../EndGame/EndGame'

const PORT = '3002/';
let API;
if (process.env.NODE_ENV === "production"){
    API = 'https://backend-riddles.herokuapp.com/';
} else {
    API = 'http://localhost:' + PORT;
}


class RiddleContainer extends Component {
    constructor(props) {
        super(props);
        this.sendResult = this.sendResult.bind(this)
        this.getImage = this.getImage.bind(this)
        this.state = {
            image: null,
            label: null,
            isLoading: true,
            curStage: 0,
            endGame: false,
        }
      }

    componentDidMount(){
        this.getImage()
    }
    
    getImage(){
        const url = API
        this.setState({isLoading: true})
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({image: response.image, label: response.label, isLoading: false}))
            .catch(error => console.log(error))
    }

    sendResult(answer) {
        const url = API
        fetch(url, 
            { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({answer, stage: this.state.curStage}) 
            })
            .then(response => response.json())
            .then(response => {
                if (response.result === "Correct"){
                    this.setState({
                        curStage: this.state.curStage + 1,
                        image: response.next_stage.image,
                        label: response.next_stage.label
                    })
                    Alert.success('Congratulations!', {
                        position: 'top-right',
                        effect: 'scale',
                        timeout: 5000
                    });
                } else if (response.result === "Finish") {
                    this.setState({
                        endGame: true
                    })
                } else {
                    Alert.error('Wrong Answer', {
                        position: 'top-right',
                        effect: 'scale',
                        timeout: 2000
                    });
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        if (this.state.endGame){
            return (
                <EndGame />
            )
        } return (
            <div>
                <Riddle 
                    image = {this.state.image}
                    label = {this.state.label}
                    isLoading = {this.state.isLoading}
                    sendResult = {this.sendResult}
                    curStage = {this.state.curStage}
                />
                <Alert stack={{limit: 3}} />
            </div>
        )   
    }
}

export default RiddleContainer