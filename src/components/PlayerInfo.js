import React from "react";

class PlayerInfo extends React.Component {
    constructor(props) {
        props();
        
        const state = {
            team: null
        }
    }

    render() {
        return (
            <div>
                <div>
                    
                    <p>Name: {}</p>
                    <hr />

                    <p>Age: {}</p>
                    <hr />
                    
                    <p>Position: {}</p>
                    <hr />
                    
                    <p>Team: {}</p>
                    <br />

                </div>
            </div>
        )
    }
}

export default PlayerInfo;