import React from "react";

class ChoosePlayerForm extends React.Component {
    constructor(props) {
        props();
        
        const state = {
            team: null
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={ () => {} }>
                    <div className="form-group">
                        <label>Team:</label>
                        <select name="team_name" value={this.state.team} onChange={this.setState({...this.state, team: this.state.team})} required>
                            <options></options>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Player:</label>
                        <select name="player" disabled={ this.state.team === null } required>
                            <options></options>
                        </select>
                    </div>

                </form>
            </div>
        )
    }
}

export default ChoosePlayerForm;