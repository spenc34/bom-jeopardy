import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkAnswer, addToScore } from '../actions'
import '../css/Card.css'
import Score from './Score';

class Wager extends Component {

    constructor(props) {
        super(props);
        this.state = {
          wager: ''
        };
      }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.answer) {
            this.props.checkAnswer(this.props.currentClue.categoryId, this.props.currentClue.difficulty, this.state.answer);
        }
    }

    isValidWager(wagerString) {
        if (isNaN(wagerString)) {
            return false;
        }
        let wager = parseInt(wagerString);
        let maxWager = 1000;
        if (this.props.score > 1000) {
            maxWager = this.props.score;
        }
        return ((wager % 1 === 0) && wager > 0 && wager <= maxWager);
    }

    onContinue(e) {
        e.preventDefault();
        let score = 100 * this.props.round * this.props.currentClue.difficulty;
        if (!this.props.isAnswerCorrect) {
            score *= -1;
        }
        this.props.addToScore(score);
    }

    renderForm() {
        if (this.props.answerSubmitted) {
            if (this.props.isAnswerCorrect) {
                return (
                    <div className="answer-response">
                        Correct!
                        <form onSubmit={this.onContinue.bind(this)}>
                            <button className="btn btn-outline-light btn-lg">Continue</button>
                        </form>
                    </div>
                );
            } else {
                return (
                    <div className="answer-response">
                        <span id="incorrect-span">Incorrect.</span> The correct answer was {this.props.correctAnswer}.
                        <form onSubmit={this.onContinue.bind(this)}>
                            <button className="btn btn-outline-light btn-lg">Continue</button>
                        </form>
                    </div>
                    
                );
            }
        } else {
            return (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control" placeholder="Answer here" 
                            aria-label="Answer here" aria-describedby="basic-addon2"
                            onChange={(element) => this.setState({ answer: element.target.value})}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-light" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            );
        }
    }

    render () {
        console.log(this.props)
        return (
            <div>
                <div className="Card title">{this.props.title.toUpperCase()}</div>
                <div className="Card title">{this.props.currentClue.category.toUpperCase()}</div>
                <div className="Card display-clue wager">
                    Enter your wager below. If your score is less than $1,000, you can wager up to $1,000.
                    <Score score={this.props.score}/>
                    <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Your wager here" 
                            aria-label="Answer here" aria-describedby="basic-addon2"
                            onChange={(element) => this.setState({ answer: element.target.value})}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-light" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentClue: state.currentClue,
        score: state.score
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAnswer: (id, difficulty, answer) => {
            dispatch(checkAnswer(id, difficulty, answer));
        },
        addToScore: (value) => {
            dispatch(addToScore(value));
        }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (Wager);