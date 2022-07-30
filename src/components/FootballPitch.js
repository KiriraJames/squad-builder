import React from "react";
import PositionMarker from './PositionMarker'

class FootballPitch extends React.Component {

    renderFormation() {
        if( Object.keys(this.props.formationPositions).length !== 11 ) {
            return
        }

        // for ( let i = 0; i < this.refs.length; i++ ) {
        //     position.setAttribute('data-formation-position', this.state.formationPositions[i])
        // }

        return [...Array(11)].map((value, index) => 
                    
            <PositionMarker key={index} number={index + 1} formationPosition={ this.props.formationPositions[index + 1] } />

        )

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