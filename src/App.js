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

      formation: '4-5-1',
      // formationPositions: {},

      choosePlayer: false,
      selectedPlayer: null,
      selectedPosition: null,
    }

    this.changeFormation = this.changeFormation.bind(this)

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



  componentDidMount() {
    // this.setFormationPositions();
  }


  render() {
    return (
      <div className="App">

        Hello

        <FootballPitch 
          formationPositions={ this.getFormationPositions() } 
        />

        <InfoCard
          formations={ Object.keys(Formations) }
          choosePlayer={ this.state.choosePlayer }
          changeFormation={ this.changeFormation }
        />

      </div>
    );
  }
  
}

export default App;
