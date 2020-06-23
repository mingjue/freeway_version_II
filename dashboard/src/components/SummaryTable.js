import React from "react"

class SummaryTable extends React.Component {

    convertToDisplay(value) {
        if (value != null) {
            // coerce to Number and add commas...
            return Number(value).toLocaleString()
        }
        else
            return "n/a"
    }

    test(){
        return(
            this.props.details[0].stationid.map((id)=>{
                return <tr><td>{id}</td></tr>
            }))
    }

    renderHeader() {
        return <thead>
            <tr>
                <th>Field</th>
                <th>Value</th>
            </tr>
        </thead>
    }

    renderLabel(label) {
        return <em>{label}</em>
    }

    renderStatistic(label, value) {
        return <>
            <td>{label}</td>
            <td className="right aligned">{this.convertToDisplay(value)}</td>
        </>
    }

    renderBody() {
        return <tbody>
            <tr>
                <td>{this.renderLabel("latlon")}</td>
                <td>{this.props.details[0].latlon}</td>
            </tr>
            <tr>
                <td >{this.renderLabel("length")}</td>
                <td>{this.props.details[0].length} miles</td>
            </tr>
            <tr>
                <td >{this.renderLabel("milepost")}</td>
                <td>{this.props.details[0].milepost}</td>
            </tr>
            <tr>
                <td >{this.renderLabel("locationtext")}</td>
                <td>{this.props.details[0].locationtext}</td>
            </tr>
            <tr>
                <td >{this.renderLabel("numberlanes")}</td>
                <td>{this.props.details[0].numberlanes}</td>
            </tr>

            <tr>
                <td rowSpan={this.props.details[0].stationid.length+1}>{this.renderLabel("detectorid")}</td>
            </tr>
                {this.test()}
        </tbody>
    }


    render() {
        return <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <table className="ui celled structured table">
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        </div>
    }
}

export default SummaryTable
