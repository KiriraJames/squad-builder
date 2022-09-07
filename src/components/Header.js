import React from "react";
import GithubIcon from "../assets/images/GitHub-Mark-Light-120px-plus.ico";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.menuRef = React.createRef();

        this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this)

    }

    toggleMenuDisplay() {

        let showOrHideMenu = this.menuRef.current.dataset.menuToggle == 'show' ? 'hide' : 'show';

        this.menuRef.current.dataset.menuToggle = showOrHideMenu;

        console.log(this.menuRef.current.dataset)

    }

    render(){
        return (
            <div className="header">

                <div className="logo-wrapper">
                    <h1>Squad builder</h1>
                </div>

                <div className="menu-wrapper">

                    <div className="hamburger">
                        <span className="hamburger-icon" onClick={ this.toggleMenuDisplay }></span>
                    </div>

                    <nav className="menu" ref={ this.menuRef }>
                        <div className="menu-item">
                            <a href="https://github.com/KiriraJames/squad-builder" target="_blank">
                                <img src={GithubIcon} alt="link to github" /><span className="link-name">Github</span>
                            </a>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
}

export default React.memo(Header);