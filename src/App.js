import React from 'react';
import './assets/sass/App.scss';
import FootballPitch from './components/FootballPitch'
import InfoCard from './components/InfoCard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formation: '4-4-2',
      formationPositions: {},
      selectedPosition: null,
    }
  }

  setFormationPositions() {
    switch(this.state.formation) {

      case ('4-4-2'):
          this.setState({
              formationPositions: { 1: 'gk', 2: 'rb', 3: 'lb', 4: 'lcb', 5: 'rcb', 6: 'rcm', 7: 'rm', 8: 'lcm', 9: 'rs', 10: 'ls', 11: 'lm' },
              // formationPositions: {
              //     defence: { 2: 'rb', 3: 'lb', 4: 'lcb', 5: 'rcb' },
              //     midfield: { 6: 'rcm', 7: 'rm', 8: 'lcm', 11: 'lm' },
              //     attack: { 9: 'rs', 10: 'ls' }
              // },
          });
          break;
      default:
          break;
        
    }

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
