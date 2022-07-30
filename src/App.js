import React from 'react';
import './assets/sass/App.scss';
import FootballPitch from './components/FootballPitch'
import InfoCard from './components/InfoCard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formation: '4-4-2',
      selectedPosition: null
    }
  }

  changeFormation(){

  }

  render() {
    return (
      <div className="App">
        Hello
        <FootballPitch formation={this.state.formation} onFormationChange={this.changeFormation}/>
        {/* <InfoCard /> */}
      </div>
    );
  }
  
}

export default App;
