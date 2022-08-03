import React from "react";
import PlayerInfo from './PlayerInfo'
import ChoosePlayerForm from './ChoosePlayerForm'
import ChangeFormationForm from './ChangeFormationForm'

class InfoCard extends React.Component {
    render() {
        return (
            <div className="info-card">

                <ChangeFormationForm formations={this.props.formations} changeFormation={this.props.changeFormation}/>

                { this.props.selectedPlayer && this.props.selectedPosition && !this.props.choosePlayer && <PlayerInfo selectedPlayer={ this.props.selectedPlayer } />}

                {/* { this.props.selectedPosition && this.props.choosePlayer && <ChoosePlayerForm /> } */}

            </div>
        )
    }
}

export default InfoCard;