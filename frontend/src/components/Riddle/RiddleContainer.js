import React, { Component } from 'react'
import Riddle from './Riddle'
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const PORT = '3002/';
const API = 'http://localhost:' + PORT;

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
        }
      }

    componentDidMount(){
        this.getImage()
    }
    
    getImage(){
        const url = API + '?stage=' + this.state.curStage.toString();
        this.setState({isLoading: true})
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({image: response.image, label: response.label, isLoading: false}))
            .catch(error => console.log(error))
    }
    sendResult(answer) {
        const url = API + '?stage=' + this.state.curStage.toString();
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
                        curStage: this.state.curStage + 1
                    })
                    Alert.success('Congratulations!', {
                        position: 'top-right',
                        effect: 'scale',
                        timeout: 5000
                    });
                    this.getImage()
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
        return (
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