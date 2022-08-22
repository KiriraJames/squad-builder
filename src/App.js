import { parse, differenceInYears } from 'date-fns';

import React from 'react';
import LoadingScreen from './components/LoadingScreen';
import FootballPitch from './components/FootballPitch';
import InfoCard from './components/InfoCard';

import Formations from './helpers/formations';

import './assets/sass/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      squad: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null },
      formation: '4-5-1',

      leagues: [],
      teams: [],

      choosePlayer: false,
      selectedPlayer: null,
      selectedPosition: null,
      selectedTeam: null,
    }

    this.changeFormation = this.changeFormation.bind(this)
    this.fetchTeams = this.fetchTeams.bind(this)
    this.fetchTeamData = this.fetchTeamData.bind(this)
    this.toggleInfoCard = this.toggleInfoCard.bind(this)
    this.selectPlayer = this.selectPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)

  }

  getFormationPositions() {

    if ( ! Formations.hasOwnProperty( this.state.formation )) {
      return {}
    }

    return Formations[this.state.formation].formationPositions

  }

  changeFormation(e) {

    if( ! e.target.value ) {
      return
    }

    this.setState({
      formation: e.target.value
    })

  }

  toggleInfoCard(position) {

    if( this.state.selectedPosition !== null ) {

      if( position['squad_number'] === this.state.selectedPosition['squad_number'] && position['formation_position'] === this.state.selectedPosition['formation_position'] ) {
      
        this.setState({
          choosePlayer: false,
          selectedPosition: null,
          selectedPlayer: null
        })

        return
      }

    }
    

    if( this.state.squad[ position['squad_number'] ] ) {

      this.setState({
        choosePlayer: false,
        selectedPlayer: this.state.squad[ position['squad_number'] ],
        selectedPosition: position
      })

    } else {

      this.setState({
        choosePlayer: true,
        selectedPosition: position
      })

    }

  }

  async fetchLeagues() {
    await fetch('/api/leagues', {
        mode: 'cors',
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          leagues: data
        })
      })
      .catch(error => console.log(error))
  }

  async fetchTeams(e) {

    this.setState({ loading: true })
    
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
      .then(() => this.setState({ loading: false }) )

  }

  async fetchTeamData(e) {

    this.setState({ loading: true })

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
      .then(() => this.setState({ loading: false }) )

  }

  playerHasAlreadyBeenSelected(player_id){
    let duplicate_player = Object.values(this.state.squad)
                            .filter(already_selected_player => already_selected_player !== null)
                            .find(already_selected_player => already_selected_player.id === player_id);

    if ( duplicate_player ) {
      return true 
    } else {
      return false
    }

    // OR
    // return true && duplicate_player
    // https://developer.mozilla.org/en-US/docs/Glossary/Truthy#the_logical_and_operator

  }

  selectPlayer(team_squad_index) {

    if( ! team_squad_index ) {
      return
    }

    this.setState({ loading: true })

    let number = this.state.selectedPosition['squad_number']

    let player = this.state.selectedTeam.squad[team_squad_index]

    if( this.playerHasAlreadyBeenSelected(player.id) ) {
      this.setState({ loading: false })
      alert("Player has already been selected !");
      return
    }

    player['age'] = differenceInYears( new Date(), parse(player.dateOfBirth, 'yyyy-MM-dd', new Date()) )
    player['team'] = {
      id: this.state.selectedTeam.id,
      tla: this.state.selectedTeam.tla,
      shortname: this.state.selectedTeam.shortname,
      name: this.state.selectedTeam.name,
      crest: this.state.selectedTeam.crest,
      area: this.state.selectedTeam.area.name,
      clubColors: this.state.selectedTeam.clubColors,
    }


    this.setState(prevState => ({
        squad: { ...prevState.squad, [number]: player },
        choosePlayer: false,
        selectedTeam: null,
        selectedPosition: null,
        loading: false
      })
    )

  }

  removePlayer(){
    if ( ! this.state.selectedPosition ) {
      return
    }

    this.setState({ loading: true })

    let squad_number = this.state.selectedPosition.squad_number
    this.setState(prevState => ({
        squad: { ...prevState.squad, [squad_number]: null },
        selectedPlayer: null,
        choosePlayer: true,
        loading: false
      })
    )
  }


  componentDidMount() {
      this.fetchLeagues()
        .then(() => this.setState({ loading: false }))
  }


  render() {
    return (
      <div className="app">

        Hello

        { this.state.loading && <LoadingScreen /> }

        <FootballPitch 
          squad={ this.state.squad }
          selectedPosition={ this.state.selectedPosition }
          formationPositions={ this.getFormationPositions() }
          toggleInfoCard={ this.toggleInfoCard }
        />

        <InfoCard
          formations={ Formations }
          leagues={ this.state.leagues }
          teams={ this.state.teams }
          choosePlayer={ this.state.choosePlayer }
          selectedPlayer={ this.state.selectedPlayer }
          selectedTeam={ this.state.selectedTeam }
          selectedPosition={ this.state.selectedPosition }
          changeFormation={ this.changeFormation }
          fetchTeams={ this.fetchTeams }
          fetchTeamData={ this.fetchTeamData }
          selectPlayer={ this.selectPlayer }
          removePlayer={ this.removePlayer }
        />

      </div>
    );
  }
  
}

export default App;
