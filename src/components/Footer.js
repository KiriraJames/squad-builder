import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="copyright">
                    <span>&copy; Copyright 2022.</span>
                </div>
            </div>
        );
    }
}

export default React.memo(Footer);