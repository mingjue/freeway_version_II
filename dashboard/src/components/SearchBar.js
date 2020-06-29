import React from "react"

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleInputChange = props.handleInputChange
        //this.handleGraphChange = props.handleGraphChange
    }

    renderSelections() {
        return this.props.stations.map((station) => {
            return <option key={station} value={station}>{station}</option>
        })
    }

    render() {
        return <div className="ui raised very padded text container segment">
            <div className={"ui search"}>
                <select className="ui fluid dropdown" onChange={this.handleInputChange}>
                    {this.renderSelections()}
                </select>
            </div>
        </div>
    }
}

export default SearchBar
