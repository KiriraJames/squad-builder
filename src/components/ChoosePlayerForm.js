import React from "react";

class ChoosePlayerForm extends React.Component {

    render() {
        return (
            <div className="choose-player-form">

                <h3>Choose a Player: </h3>

                <div className="form-group">
                    Position: { this.props.selectedPosition }
                </div>

                <div>
                    <label>Team:</label>
                    <select name="team_name" required>
                        <options></options>
                    </select>
                </div>

                <div>
                    <label>Player:</label>
                    <select name="player" required>
                        <options></options>
                    </select>
                </div>

            </div>
        )
    }
}

export default ChoosePlayerForm;