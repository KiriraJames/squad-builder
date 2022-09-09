import React from "react";
import PropTypes from 'prop-types';
import PositionMarker from './PositionMarker'

class FootballPitch extends React.Component {

    renderFormation() {
        if( Object.keys(this.props.formationPositions).length !== 11 ) {
            return
        }

        return Object.keys(this.props.squad).map((squad_number, index) => 
                    
            <PositionMarker 
                key={ index }
                number={ parseInt(squad_number) }
                player={ this.props.squad[squad_number] }
                formationPosition={ this.props.formationPositions[squad_number] }
                isActive={ this.props.selectedPosition && this.props.selectedPosition['squad_number'] === parseInt(squad_number) }
                toggleInfoCard={ this.props.toggleInfoCard }
            />

        )

    }

    render() {
        return (
            <div className='football-pitch-wrapper'>

                <div className="football-pitch">
                
                    <div className="formation-grid">
                    { 

                        this.renderFormation()

                    }
                    </div>

                </div>
                
            </div>
        )
    }
}

FootballPitch.propTypes = {
    squad: PropTypes.object.isRequired,
    selectedPosition: PropTypes.object,
    formationPositions: PropTypes.object,
    toggleInfoCard: PropTypes.func,
}

export default FootballPitch;