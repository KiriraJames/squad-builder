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
        let length_of_names_array = names_array.length

        let display_name = ''
        let last_name = names_array[length_of_names_array - 1]

        if ( length_of_names_array > 2 ) {

            let second_last_name = names_array[length_of_names_array - 2]
            display_name = second_last_name + ' ' + last_name;

        } else {

            display_name = last_name;

        }
        
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
                    <span className={ ( this.props.player && this.getPlayerDisplayName(this.props.player.name).length > 6 ) ? ' scrolling-text' : '' }>
                        { this.props.player ? this.getPlayerDisplayName(this.props.player.name) : this.props.formationPosition.toUpperCase() }
                    </span>
                </div>
                
            </div>
        );
    }
}

export default PositionMarker;