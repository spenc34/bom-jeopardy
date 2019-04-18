import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../actions'
import CategoryRow from './CategoryRow';
import ClueBoard from './ClueBoard';
import Score from './Score';

class GameBoard extends Component {

  render() {
    return (
      <div className="container">
        <CategoryRow categories={this.props.categories}/>
        <br/>
        <ClueBoard />
        <br/>
        <div className="row">
          <div className="col">
            <Score score={this.props.score}/>
          </div>
        </div>
      </div>
    )
  }
    
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    round: state.round,
    score: state.score
  };
}

export default connect(mapStateToProps) (GameBoard);