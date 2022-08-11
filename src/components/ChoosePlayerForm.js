import React from "react";

class ChoosePlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.selectPlayerRef = React.createRef();
    }

    render() {
        return (
            <div className="choose-player-form">

                <h3>Choose a Player: </h3>

                <div className="form-group">
                    <p>Position: { `${this.props.selectedPosition['squad_number']} ( ${this.props.selectedPosition['formation_position'].toUpperCase()} )` }</p>
                </div>

                <div>
                    <label>League:</label>
                    <select name="league" onChange={ this.props.fetchTeams } required>
                        
                        <option value=''>Select a league</option>
                        {
                            this.props.leagues.map(league => (
                                <option key={ league.id } value={ league.id }>{ league.name }</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label>Team:</label>
                    <select name="team" onChange={ this.props.fetchTeamData } required>

                        <option value=''>Select a Team</option>
                        {
                            
                            this.props.teams.length > 1 
                            
                            &&
                            
                            this.props.teams.map(team => (
                                <option key={ team.id } value={ team.id }>{ team.name }</option>
                            ))

                        }
                    </select>
                </div>

                 <div>
                    <label>Player:</label>
                    <select name="player" ref={ this.selectPlayerRef } required>

                        <option value=''>Select a Player</option>
                        {

                            this.props.selectedTeam 
                            
                            &&
                            
                            this.props.selectedTeam.squad.map((player, index) => (
                                <option key={ player.id } value={ index }>{ player.name }</option>
                            ))

                        }
                    </select>
                </div>

                <div>
                    <button type="submit" onClick={ (e) => this.props.selectPlayer(this.selectPlayerRef.current.value, e) }>Save</button>
                </div>

            </div>
        )
    }
}

export default ChoosePlayerForm;