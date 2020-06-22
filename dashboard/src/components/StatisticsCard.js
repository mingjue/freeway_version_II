import React from "react"

const NoDataText = "n/a"

class StatisticsCard extends React.Component {

    convertToDisplay(value) {
        if (value != null) {
            // coerce to Number and add commas...
            return Number(value).toLocaleString()
        }
        else
            return NoDataText
    }
    
    

    render() {
        return <div className="card" style={{ alignItems: "center" }}>
            <div className="content">
                <div className={`ui top attached ${this.props.color} large label`} style={{ textAlign: "center" }}>{this.props.label}</div>
                <div className="ui statistics">
                    <div className="ui statistic">
                        <div className="value">
                            {this.convertToDisplay(this.props.total)}</div>
                        <div className="label">{this.props.label}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default StatisticsCard
