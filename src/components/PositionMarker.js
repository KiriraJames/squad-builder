import React from "react";

class PositionMarker extends React.Component {
    
    render() {
        return (
            <div className={ 'position-marker' + (this.props.isActive ? ' active' : '') } data-formation-position={ this.props.formationPosition } onClick={ (e) => this.props.toggleInfoCard( this.props.number, e ) }>
                
                <div className="circle">
                    { this.props.number }
                </div>

                <div className="name-tag">
                    { this.props.formationPosition }
                </div>
                
            </div>
        );
    }
}

export default PositionMarker;