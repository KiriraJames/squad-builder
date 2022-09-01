import React from 'react';
import LoadingScreen from './components/LoadingScreen';
import FootballPitch from './components/FootballPitch';
import InfoCard from './components/InfoCard';
import Header from './components/Header';
import Footer from './components/Footer';

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

      choosePlayer: false,
      selectedPlayer: null,
      selectedPosition: null,
    }

    this.appRef = React.createRef();

    this.getFormationPositions = this.getFormationPositions.bind(this)
    this.changeFormation = this.changeFormation.bind(this)
    this.toggleInfoCard = this.toggleInfoCard.bind(this)
    this.fetchLeagues = this.fetchLeagues.bind(this)
    this.playerHasAlreadyBeenSelected = this.playerHasAlreadyBeenSelected.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
    this.setLoading = this.setLoading.bind(this)

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

    // check if clicked position is already currently selected
    if( this.state.selectedPosition !== null ) {

      if( position['squad_number'] === this.state.selectedPosition['squad_number'] && position['formation_position'] === this.state.selectedPosition['formation_position'] ) {
      
        this.setState({
          choosePlayer: false,
          selectedPosition: null,
          selectedPlayer: null
        })

        if( this.appRef.current.style.background ) {
          this.appRef.current.style.background = null
        }

        return
      }

    }
    

    if( this.state.squad[ position['squad_number'] ] ) {

      let selected_player = this.state.squad[ position['squad_number'] ]

      this.setState({
        choosePlayer: false,
        selectedPlayer: selected_player,
        selectedPosition: position
      })

      this.appRef.current.style.background = 'linear-gradient(' + selected_player.team.bgColor + ')' 
            
      
    } else {

      this.setState({
        choosePlayer: true,
        selectedPosition: position
      })

      if( this.appRef.current.style.background ) {
        this.appRef.current.style.background = null
      }

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

  addPlayer(new_player) {

    if( ! new_player || Object.keys(new_player).length < 1 ) {
      return
    }

    this.setState({ loading: true })

    if( this.playerHasAlreadyBeenSelected(new_player.id) ) {
      this.setState({ loading: false })
      alert("Player has already been selected !");
      return
    }

    let squad_number = this.state.selectedPosition['squad_number']

    this.setState(prevState => ({
        squad: { ...prevState.squad, [squad_number]: new_player },
        choosePlayer: false,
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

  setLoading(toggle){

    if( typeof toggle !== "boolean" ) {
      return
    }

    this.setState({
      loading: toggle
    })

  }

  componentDidMount() {
      this.fetchLeagues()
        .then(() => this.setState({ loading: false }))
  }


  render() {
    return (
      <div className="app" ref={this.appRef}>

        { this.state.loading && <LoadingScreen /> }

        <Header />

        <div className='content'>

          <FootballPitch 
            squad={ this.state.squad }
            selectedPosition={ this.state.selectedPosition }
            formationPositions={ this.getFormationPositions() }
            toggleInfoCard={ this.toggleInfoCard }
          />

          <InfoCard
            formations={ Formations }
            leagues={ this.state.leagues }
            choosePlayer={ this.state.choosePlayer }
            selectedPlayer={ this.state.selectedPlayer }
            selectedPosition={ this.state.selectedPosition }
            changeFormation={ this.changeFormation }
            addPlayer={ this.addPlayer }
            removePlayer={ this.removePlayer }
            setLoading={ this.setLoading }
          />

        </div>

        <Footer />

      </div>
    );
  }
  
}

export default App;
