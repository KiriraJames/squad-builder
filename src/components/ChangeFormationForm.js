import React from "react";

class ChangeFormationForm extends React.Component {

    render() {
        return (
            <div className="change-formation-form">
                <form>
                    <div>
                        <label>Formation:</label>
                        <select name="formation" onChange={ this.props.changeFormation } required>

                            <option value=''>Change the formation</option>

                            { 
                                Object.keys(this.props.formations).map((key, index) =>

                                    <option key={key} value={key}>

                                        {this.props.formations[key]['name']}

                                    </option>

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