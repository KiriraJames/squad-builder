import React from "react";
import PlayerInfo from './PlayerInfo'
import ChoosePlayerForm from './ChoosePlayerForm'
import ChangeFormationForm from './ChangeFormationForm'

class InfoCard extends React.Component {
    render() {
        return (
            <div className="info-card-wrapper">

                <div className="info-card">

                    <ChangeFormationForm formations={this.props.formations} changeFormation={this.props.changeFormation}/>

                    { !this.props.choosePlayer && this.props.selectedPlayer && <PlayerInfo 
                                                                                    selectedPlayer={ this.props.selectedPlayer }
                                                                                    selectedPosition={ this.props.selectedPosition }
                                                                                    removePlayer={ this.props.removePlayer } /> }

                    { this.props.choosePlayer && this.props.selectedPosition && <ChoosePlayerForm 
                                                                                    leagues={ this.props.leagues }
                                                                                    selectedPosition={ this.props.selectedPosition }
                                                                                    addPlayer={ this.props.addPlayer }
                                                                                    setLoading={ this.props.setLoading } /> }

                </div>

            </div>
            
        )
    }
}

export default InfoCard;