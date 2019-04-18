import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Card.css';

class ClueCard extends Component {

    render () {
        if (this.props.usedSquareKeys.includes(this.props.cardId)) {
            return (
                <div className="Card empty">
                    <span className="hidden-text">0</span>
                </div>
            );
        }
        return (
            <div className="Card clue">
                ${this.props.difficulty * 100 * this.props.round}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        usedSquareKeys: state.usedSquareKeys
    };
}

export default connect(mapStateToProps) (ClueCard);