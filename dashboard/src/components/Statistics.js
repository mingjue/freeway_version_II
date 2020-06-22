import React from "react"
import StatisticsCard from "./StatisticsCard"

const Statistics = (props) => {
    console.log(`in the statistics class ${props.overspeednumber}`)
    return (
        <div className={"ui three cards"} style={{ paddingTop: "10px", paddingBottom: "10px"}}>
            <StatisticsCard label="Over Speed Number" total={props.overspeednumber} color={"red"} />
            <StatisticsCard label="Volume" total={props.volume} color={"blue"} />
            <StatisticsCard label="Estimate Travel Time (min)" total={props.traveltime} color={"yellow"} />
        </div>
    )
}

export default Statistics
