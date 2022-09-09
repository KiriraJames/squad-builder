import React from "react";
import PropTypes from "prop-types";

class PlayerInfo extends React.Component {
    render() {
        return (
            <div>
                <div>
                    
                    <p>Name:</p>
                    <p>{ this.props.selectedPlayer.name }</p>
                    <hr />

                    <p>Age: { this.props.selectedPlayer.age }</p>
                    <hr />
                    
                    <p>Position: { this.props.selectedPosition && `${this.props.selectedPosition['squad_number']} ( ${this.props.selectedPosition['formation_position'].toUpperCase()} )` }</p>
                    <hr />
                    
                    <p>Team:</p>
                    <p>{ this.props.selectedPlayer.team.name }</p>
                    <br />

                </div>
                <div>
                    <button type="submit" onClick={ this.props.removePlayer }>Remove</button>
                </div>
            </div>
        )
    }
}

PlayerInfo.propTypes = {
    selectedPlayer: PropTypes.object.isRequired,
    selectedPosition: PropTypes.object.isRequired,
    removePlayer: PropTypes.func
}

export default PlayerInfo;