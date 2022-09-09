import React from "react";
import PropTypes from "prop-types";

class PositionMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageCantDisplay: false
        }

        this.imageCantLoad = this.imageCantLoad.bind(this)

    }

    imageCantLoad() {
        this.setState({
            imageCantDisplay: true
        })
    }
    
    render() {
        return (
            <div className={ 'position-marker' + (this.props.isActive ? ' active' : '') + (this.props.player ? ' filled' : '') } data-formation-position={ this.props.formationPosition } onClick={ (e) => this.props.toggleInfoCard( {squad_number:this.props.number, formation_position:this.props.formationPosition}, e ) }>
                
                
                {
                    ( ! this.props.player || this.state.imageCantDisplay ) 
                    
                    && 
                    
                    <div className="circle">

                        { this.props.number }
                        
                    </div>
                
                }
                
                {
                    ( this.props.player && ! this.state.imageCantDisplay )
                    
                    &&

                    <div className="player-badge">
                                        
                        <img src={this.props.player.team.crest} onError={ this.imageCantLoad } />

                    </div>

                }

                <div className="name-tag">
                    <span className={ ( this.props.player && this.props.player.display_name?.length > 6 ) ? ' scrolling-text' : '' }>
                        { this.props.player ? this.props.player.display_name : this.props.formationPosition.toUpperCase() }
                    </span>
                </div>
                
            </div>
        );
    }
}

PositionMarker.propTypes = {
    number: PropTypes.number.isRequired,
    formationPosition: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    player: PropTypes.object,
    toggleInfoCard: PropTypes.func
}

export default PositionMarker;