import React from "react";
import PlayerInfo from './PlayerInfo'
import ChoosePlayerForm from './ChoosePlayerForm'

class InfoCard extends React.Component{
    render() {
        return (
            <div className="info-card">

                { this.props.selectedPlayer && !this.props.choosePlayer && <PlayerInfo />}

                { this.props.choosePlayer && <ChoosePlayerForm /> }

            </div>
        )
    }
}

export default InfoCard;