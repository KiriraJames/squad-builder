import React from "react";

class ChangeFormationForm extends React.Component {

    render() {
        return (
            <div>
                <form>
                    <div>
                        <label>Formation:</label>
                        <select name="formation" onChange={ this.props.changeFormation } required>

                            <option value=''>Change the formation</option>

                            { 
                                this.props.formations.map((formation, index) =>

                                    <option key={index} value={formation}>{formation}</option>

                                )
                            }

                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangeFormationForm;