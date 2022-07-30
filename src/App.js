import React from 'react';
import FootballPitch from './components/FootballPitch'
import InfoCard from './components/InfoCard'

import Formations from './helpers/formations';

import './assets/sass/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formation: '4-5-1',
      formationPositions: {},
      selectedPosition: null,
    }
  }

  
  setFormationPositions() {

    if ( ! Formations.hasOwnProperty( this.state.formation )) {
      return
    }

    this.setState({
      formationPositions: Formations[this.state.formation].formationPositions
    })

  }



  changeFormation(){

  }



  componentDidMount() {
    this.setFormationPositions();
  }


  render() {
    return (
      <div className="App">

        Hello

        <FootballPitch 
          formationPositions={this.state.formationPositions} 
        />

        {/* <InfoCard 
          onFormationChange={this.changeFormation}
        /> */}

      </div>
    );
  }
  
}

export default App;
