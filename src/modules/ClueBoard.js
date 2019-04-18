import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClue, disableCard, changeDisplay } from '../actions';
import ClueCard from './ClueCard';

class ClueBoard extends Component {

    render () {
        return <div>
            {
                [1,2,3,4,5].map ( (n) => {
                    return this.renderRow(n)
                })
            }
        </div>
    }

    onCardClicked(cardId, categoryId, difficulty) {
        if (this.props.usedSquareKeys.includes(cardId)) {
            return;
        }
        this.props.fetchClue(categoryId, difficulty);
        this.props.disableCard(cardId);
    }

    renderRow (level) {
        if (this.props.round === 0) {
            return <div key={"Not yet loaded row " + level}></div>
        }
        let levelId = (level - 1) * 5;
        return <div key={"Level: " + level + " Round: " + this.props.round} className="row">
                {
                    [1,2,3,4,5].map((n) => {

                        let id = this.props.categories[n - 1].id;
                        let cardId = levelId + n;
                        return (
                            <div key={"ClueCard" + cardId + this.props.round} className="col" onClick={() => this.onCardClicked(cardId, id, level)}>
                                <ClueCard cardId={cardId} difficulty={level} round={this.props.round} />
                            </div>
                        );
                    })
                }
                </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        round: state.round,
        usedSquareKeys: state.usedSquareKeys,
        dailyDoubles: state.dailyDoubles
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClue: (id, difficulty) => {
            dispatch(getClue(id, difficulty));
        },
        disableCard: (id) => {
            dispatch(disableCard(id));
        },
        changeDisplay: (display) => {
            dispatch(changeDisplay(display));
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps) (ClueBoard);