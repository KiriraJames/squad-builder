import React from "react";

class PositionMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageCantDisplay: false
        }

        this.imageCantLoad = this.imageCantLoad.bind(this)

    }

    getPlayerDisplayName(full_name) {
        let names_array = full_name.split(' ');
        
        if (names_array[1]) {
            names_array.shift();
        }
        
        let display_name = names_array.join(' ');
        return display_name.toUpperCase();
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
                    { this.props.player ? this.getPlayerDisplayName(this.props.player.name) : this.props.formationPosition.toUpperCase() }
                </div>
                
            </div>
        );
    }
}

export default PositionMarker;