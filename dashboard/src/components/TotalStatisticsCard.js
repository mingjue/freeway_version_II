import React from "react"

class TotalStatisticsCard extends React.Component {

    render() {
        return <div className="ui tiny center aligned statistics">
            <div className="ui tiny statistic">
                <div className="value">{this.props.active}</div>
                <div className="label">Active</div>
            </div>
            <div className="ui tiny statistic">
                <div className="value">{this.props.newcases}</div>
                <div className="label">New</div>
            </div>
            <div className="ui tiny statistic">
                <div className="value">{this.props.recovered}</div>
                <div className="label">Recovered</div>
            </div>
        </div>
    }
}

export default TotalStatisticsCard
