import React from "react";

class PositionMarker extends React.Component {

    getPlayerDisplayName(full_name) {
        let names_array = full_name.split(' ');
        
        if (names_array[1]) {
            names_array.shift();
        }
        
        let display_name = names_array.join(' ');
        return display_name.toUpperCase();
    }
    
    render() {
        return (
            <div className={ 'position-marker' + (this.props.isActive ? ' active' : '') + (this.props.player ? ' filled' : '') } data-formation-position={ this.props.formationPosition } onClick={ (e) => this.props.toggleInfoCard( {squad_number:this.props.number, formation_position:this.props.formationPosition}, e ) }>
                
                <div className="circle">
                    { this.props.number }
                </div>

                <div className="name-tag">
                    { this.props.player ? this.getPlayerDisplayName(this.props.player.name) : this.props.formationPosition.toUpperCase() }
                </div>
                
            </div>
        );
    }
}

export default PositionMarker;