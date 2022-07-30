import React from "react";
import PositionMarker from './PositionMarker'

class FootballPitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formationPositions: {}
        }
    }

    setFormation() {
        switch(this.props.formation) {

            case ('4-4-2'):
                this.setState({
                    formationPositions: ['gk', 'rb', 'lb', 'lcb', 'rcb', 'rcm', 'rm', 'lcm', 'rs', 'ls', 'lm'],
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

        this.renderFormation();
        
    }

    renderFormation() {
        if( this.state.formationPositions.length !== 11 ) {
            return
        }

        // for ( let i = 0; i < this.refs.length; i++ ) {
        //     position.setAttribute('data-formation-position', this.state.formationPositions[i])
        // }

        return [...Array(11)].map((value, index) => 
                    
            <PositionMarker key={index} number={index + 1} formationPosition={this.state.formationPositions[index]} />

        )

    }

    componentDidMount() {
        this.setFormation();
    }

    render() {
        return (
            <div className="football-pitch">
            
                <div className="formation-grid">
                { 

                    this.renderFormation()

                }
                </div>

            </div>
        )
    }
}

export default FootballPitch;