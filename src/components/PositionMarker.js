import React from "react";

class PositionMarker extends React.Component {
    
    render() {
        return (
            <div className="position-marker" data-formation-position={this.props.formationPosition}>
                <div className="circle">{this.props.number}</div>
                <div className="name-tag">{this.props.formationPosition}</div>
            </div>
        );
    }
}

export default PositionMarker;