import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startNewGame } from '../actions'
import '../css/App.css';
import GameBoard from './GameBoard';
import ClueDisplay from './ClueDisplay';
import Wager from './Wager'

class App extends Component {

  componentDidMount() {
    this.props.startNewGame();
  }

  render () {
    if (this.props.display === 'clue') {
      return (
        <div className="vertical-center clue-display">
          <ClueDisplay />
        </div>
      );
    }
    else if (this.props.display === 'board') {
      return (
        <div className="vertical-center">
          <GameBoard/>
        </div>
      );
    }
    else if (this.props.display === 'wager') {
      return (
        <div className="vertical-center clue-display">
          <Wager title={"Daily Double!"} />
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => {
      dispatch(startNewGame());
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
      currentClue: state.currentClue,
      display: state.display
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
