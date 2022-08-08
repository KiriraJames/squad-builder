import React from 'react';
import FootballPitch from './components/FootballPitch'
import InfoCard from './components/InfoCard'

import Formations from './helpers/formations';

import './assets/sass/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      squad: {},
      formation: '4-5-1',
      // formationPositions: {},

      choosePlayer: false,
      selectedPlayer: null,
      selectedPosition: null,
    }

    this.changeFormation = this.changeFormation.bind(this)
    this.toggleInfoCard = this.toggleInfoCard.bind(this)

  }


  // setFormationPositions() {

  //   if ( ! Formations.hasOwnProperty( this.state.formation )) {
  //     console.log('oops')
  //     return
  //   }

  //   console.log('here')
  //   this.setState({
  //     formationPositions: Formations[this.state.formation].formationPositions
  //   })

  // }


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

    // this.setFormationPositions()

  }

  toggleInfoCard(squad_number) {

    if(squad_number === this.state.selectedPosition) {
      
      this.setState({
        choosePlayer: false,
        selectedPosition: null
      })

      return

    }

    if( this.state.squad[squad_number] ) {

      this.setState({
        choosePlayer: false,
        selectedPlayer: this.state.squad[squad_number]
      })

    } else {

      this.setState({
        choosePlayer: true,
        selectedPosition: squad_number
      })

    }

  }



  componentDidMount() {
    // this.setFormationPositions();
  }


  render() {
    return (
      <div className="app">

        Hello

        <FootballPitch 
          formationPositions={ this.getFormationPositions() } 
          toggleInfoCard={ this.toggleInfoCard }
          selectedPosition={ this.state.selectedPosition }
        />

        <InfoCard
          formations={ Object.keys(Formations) }
          choosePlayer={ this.state.choosePlayer }
          selectedPlayer={ this.state.selectedPlayer }
          selectedPosition={ this.state.selectedPosition }
          changeFormation={ this.changeFormation }
        />

      </div>
    );
  }
  
}

export default App;
