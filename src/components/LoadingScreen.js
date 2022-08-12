import React from "react";
import FootballSVG from "../assets/images/football-svgrepo-com.svg"

class LoadingScreen extends React.Component {
    render() {
        return (
            <div className="overlay">
                <div className="loading-div">
                    <span className="loading-wrapper">
                        <img className="loading-svg" src={ FootballSVG } alt="..." />Loading
                    </span>
                </div>
            </div>
        )
    }
}

export default LoadingScreen;