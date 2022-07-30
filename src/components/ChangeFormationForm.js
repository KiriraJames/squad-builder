import React from "react";

class ChangeFormationForm extends React.Component {
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
                        <label>Formation:</label>
                        <select name="formation" value={this.state.team} onChange={this.setState({...this.state, team: this.state.team})} required>
                            <options></options>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangeFormationForm;