import React from "react";
import { parse, differenceInYears } from 'date-fns';

class ChoosePlayerForm extends React.Component {
    constructor(props) {
        
        super(props);

        this.state = {
            teams: [],
            selectedTeam: null,
        }

        this.selectPlayerRef = React.createRef();

        this.fetchTeams = this.fetchTeams.bind(this)
        this.fetchTeamData = this.fetchTeamData.bind(this)
        this.selectPlayer = this.selectPlayer.bind(this)

    }
    
    async fetchTeams(e) {

        this.props.setLoading(true)
        
        await fetch('/api/league/' + e.target.value + '/teams', {
            mode: 'cors',
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    teams: data
                })
            })
            .catch(error => console.log(error))
            .then(() => this.props.setLoading(false))

    }
    
    async fetchTeamData(e) {

        this.props.setLoading(true)

        await fetch('/api/teams/' + e.target.value , {
            mode: 'cors',
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    selectedTeam: data
                })
            })
            .catch(error => console.log(error))
            .then(() => this.props.setLoading(false))

    }

    getBgColor(clubColors) {

        // format club colors to get color string to set as background gradient on click
        let colors_array = clubColors.split('/')

        // return the second word from multi-word color names e.g. navy blue returns blue
        colors_array = colors_array.map(color => {
            let words_in_color = color.trim().split(' ')
            return words_in_color.length > 1 ? words_in_color[1].toLowerCase() :  words_in_color[0].toLowerCase()
        })

        let bg_color = colors_array.join(', ');
        return bg_color;

    }

    getPlayerDisplayName(full_name) {
        let names_array = full_name.split(' ');
        let length_of_names_array = names_array.length

        let display_name = ''
        let last_name = names_array[length_of_names_array - 1]

        if ( length_of_names_array > 2 ) {

            let second_last_name = names_array[length_of_names_array - 2]
            display_name = second_last_name + ' ' + last_name;

        } else {

            display_name = last_name;

        }
        
        return display_name.toUpperCase();
    }


    selectPlayer(selectedTeam_squad_index) {

        if( ! selectedTeam_squad_index ) {
          return
        }
            
        let player = this.state.selectedTeam.squad[selectedTeam_squad_index]
    
        player['age'] = differenceInYears( new Date(), parse(player.dateOfBirth, 'yyyy-MM-dd', new Date()) )
        player['display_name'] = this.getPlayerDisplayName(player.name)
        player['team'] = {
          id: this.state.selectedTeam.id,
          tla: this.state.selectedTeam.tla,
          shortname: this.state.selectedTeam.shortname,
          name: this.state.selectedTeam.name,
          crest: this.state.selectedTeam.crest,
          area: this.state.selectedTeam.area.name,
          clubColors: this.state.selectedTeam.clubColors,
          bgColor: this.getBgColor(this.state.selectedTeam.clubColors)
        }

        this.props.addPlayer(player);
    
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
                    <br />
                    <select name="league" onChange={ this.fetchTeams } required>
                        
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
                    <br />
                    <select name="team" onChange={ this.fetchTeamData } required>

                        <option value=''>Select a Team</option>
                        {
                            
                            this.state.teams.length > 1 
                            
                            &&
                            
                            this.state.teams.map(team => (
                                <option key={ team.id } value={ team.id }>{ team.name }</option>
                            ))

                        }
                    </select>
                </div>

                 <div>
                    <label>Player:</label>
                    <br />
                    <select name="player" ref={ this.selectPlayerRef } required>

                        <option value=''>Select a Player</option>
                        {

                            this.state.selectedTeam 
                            
                            &&
                            
                            this.state.selectedTeam.squad.map((player, index) => (
                                <option key={ player.id } value={ index }>{ player.name }</option>
                            ))

                        }
                    </select>
                </div>

                <div>
                    <br />
                     {/* using refs just for the sake :) */}
                    <button type="submit" onClick={ (e) => this.selectPlayer(this.selectPlayerRef.current.value, e) }>Save</button>
                </div>

            </div>
        )
    }
}

export default ChoosePlayerForm;