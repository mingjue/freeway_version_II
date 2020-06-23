import React from "react";
import SearchBar from "./SearchBar"
import Statistics from "./Statistics"
import SummaryTable from "./SummaryTable"
import DatePickerDemo from "./DatePickerDemo"
import moment from 'moment';
import Graph from "./Graph";
import XYChart from "./XYChart";

const STATION_URL = "http://localhost:3001"


class StationApiFetcher {
    constructor() {
        this._station = this.fetchStations()
    }

    get stations() {
        return this._station
    }

   
    async fetchStationName() {
       
        let fullUrl = STATION_URL +'/stationname'
        const response = await fetch(encodeURI(fullUrl), {
            headers: {
                "method": "POST",
                "content-type": "application/json",
            }
        })
        let json = ""
        if (response.status === 200) {
            let body = await response.text()
            json = JSON.parse(body)
        } else {
            console.error(`error response status: ${response.status}`)
        }
        return json
    }
    

    async fetchStations() {
        let json = await this.fetchStationName()
        let stationsDropDown = []
      
        for (let stationInfo of json) {
          let stationName = stationInfo.locationtext
          stationsDropDown.push(stationName)
        }
        stationsDropDown = stationsDropDown.sort()
        stationsDropDown.unshift("Select Sation")
        return stationsDropDown;
    }


    async fetchStationsDetails(station) {
        let fullUrl= `http://localhost:3001/details/${station}`
        //console.log(`the url is :${fullUrl}`)
        const response = await fetch(encodeURI(fullUrl), {
            headers: {
                "method": "GET",
                "content-type": "application/json",
            }
        })
        let json = []
        if (response.status === 200) {
            json = await response.json()
            //json = await JSON.parse(body)
        } else {
            console.error(`error response status: ${response.status}`)
        }
        return json
    }


    async overSpeed(station,from,to) {
        let fullUrl= `http://localhost:3001/speed/${station}/${from}/${to}`
        //console.log(`the url is :${fullUrl}`)
        const response = await fetch(encodeURI(fullUrl), {
            headers: {
                "method": "GET",
                "content-type": "application/json",
            }
        })
        let json = []
        let total = 0
        if (response.status === 200) {
            json = await response.json()
            for (let value of json){
                total += value.overspeednumber
            }
        } else {
            console.error(`error response status: ${response.status}`)
        }
        return total
    }

    async stationVolume(station,from,to) {
        let fullUrl= `http://localhost:3001/volume/${station}/${from}/${to}`
        //console.log(`the url is :${fullUrl}`)
        const response = await fetch(encodeURI(fullUrl), {
            headers: {
                "method": "GET",
                "content-type": "application/json",
            }
        })
        let json = []
        let totol = 0
        if (response.status === 200) {
            json = await response.json()
            for (let value of json){
                totol += value.totalvolume
            }
        } else {
            console.error(`error response status: ${response.status}`)
        }
        return totol
    }

    async averageTravelTime(station,from,to) {
        //let fullUrl= `http://localhost:3001/traveltime/${station}/2011-10-20/2011-10-25`
        //console.log(`the url is :${from}, and to ${to}`)
        if (!from){
            from = "2011-10-11"
        }
        let fullUrl= `http://localhost:3001/traveltime/${station}/${from}/${to}`
        //console.log(`the url is :${fullUrl}`)
        const response = await fetch(encodeURI(fullUrl), {
            headers: {
                "method": "GET",
                "content-type": "application/json",
            }
        })
        let json = []
        let totolTime = 0
        if (response.status === 200) {
            json = await response.json()
            for (let value of json){
                totolTime += value.traveltime
            }
        } else {
            console.error(`error response status: ${response.status}`)
        }
        //totolTime = totolTime/240
        return totolTime
    }
}

const test = new StationApiFetcher();



class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            station:"",
            statistics: {},
            countries: [],
            stations:[],
            graphData: {},
            details:[],
            overspeednumber:0,
            volume:[],
            traveltimecal:[],
            from:"",
            to:"",
            isloading :true,
            showSpinner:false
        }
    }


    componentDidMount = async () => {
            this.setState({ stations: await test.stations })
            console.log(`Check the value of the station :${JSON.stringify(this.state.stations)}`)
    }


    isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false
        }
        return true
    }

    buildGraphData = async (from) => {
        // assemble the graph data...
        let graphData = {}
        
        console.log(`input station value :${this.state.station}`)
        from = new Date(from)
        let date = new Date(from.getFullYear(), from.getMonth(), 1);
        
        //var lastDay = new Date(from.getFullYear(), from.getMonth() + 1, 0);
        
        var days = [];
        while (date.getMonth() === from.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        days.push(new Date(from.getFullYear(), from.getMonth()+1, 1))
       
        let i =0
        let inputStartingDay ='';
        let inputEndingDay ='';
        let dailyOverSpeed = [];
        let dailyTravelTime = [];
        let dailyVolume = [];
        let dateDisplay = [];
        for (let day of days){
            dateDisplay.push (moment(day).format('MM/DD/YYYY'));
        }

        for (i=0; i<days.length-1;i++){
            inputStartingDay = days[i];
            inputEndingDay = days[i+1]
            //console.log(`Check the inpit days :input Starting Day:${inputStartingDay} then next input Ending Day ${inputEndingDay}`)
            dailyOverSpeed.push (await test.overSpeed(this.state.station,inputStartingDay,inputEndingDay)/100)
            dailyTravelTime.push(await test.averageTravelTime(this.state.station,inputStartingDay,inputEndingDay)/60)
            dailyVolume.push((await test.stationVolume(this.state.station,inputStartingDay,inputEndingDay))/1000)
        }
        

        console.log(dateDisplay)
        graphData ={
            options: {
                chart: {
                  id: "Freeway Daily Data",
                  height: 600,
                },
                xaxis: {
                  categories: dateDisplay
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Traffic Sources'
                },
              },
              series: [
                {
                  name: 'Over Speed 1:100',
                  type: 'column',
                  data: dailyOverSpeed
                },
                {
                  name: 'Travel Time Min',
                  type: 'line',
                  data: dailyTravelTime
                },
                {
                  name: 'Volume 1:1000',
                  type: 'column',
                  data: dailyVolume
                }
              ],
              yaxis: [
                {
                  seriesName: 'Over Speed'
                },
                {
                  seriesName: 'Travel Time'
                },
                {
                  seriesName: 'Volume'
                }
              ],
              zoom: {
                enabled: true,
                type: 'x',  
                autoScaleYaxis: false,  
                zoomedArea: {
                  fill: {
                    color: '#90CAF9',
                    opacity: 0.4
                  },
                  stroke: {
                    color: '#0D47A1',
                    opacity: 0.4,
                    width: 1
                  }
                }
            }
        }
        return graphData
    }


    handleInputChange = async (e) => {
        this.setState({showSpinner:true})
        //let station = e.target.value
        this.state.station = e.target.value
        //console.log(`input station value :${station}`)
        let stationDetails = await test.fetchStationsDetails(this.state.station)
        // another call to get card information
        let speedinformation = await test.overSpeed(this.state.station,this.state.from,this.state.to)

        let stationVolumeNumber = await test.stationVolume(this.state.station,this.state.from,this.state.to)
        let travelTimeResult = await test.averageTravelTime(this.state.station,this.state.from,this.state.to)
        travelTimeResult = travelTimeResult/60
        let getGrapData =await this.buildGraphData(this.state.from)
        this.setState({
            showSpinner:false,
            details:stationDetails,
            overspeednumber:speedinformation,
            volume:stationVolumeNumber,
            traveltimecal:travelTimeResult,
            graphData:getGrapData,
            isloading:false,
        })
    }

    handleFromChange=(from)=> {
        // Change the from date and focus the "to" input field
        from = moment(from).format('YYYY-MM-DD');
        this.setState({ from:from });
        console.log(`show me the from value ${from}`)
      }
    
    handleToChange=(to)=> {
        to = moment(to).format('YYYY-MM-DD');
        this.setState({ 
            to:to
         });
        console.log(`show me the to value ${to}`)
    }

    renderdate(){
        let showTable = !this.isEmpty(this.state.details)
        let showDashboard = (this.state.overspeednumber !==0)
        let showTime = (!this.isEmpty(this.state.from)&&(this.state.to))
        let showGraph = !this.isEmpty(this.state.graphData)
        console.log(`value of over speed number  :${this.state.overspeednumber}`)
        console.log(`value of load :${this.state.isloading}`)
        return (
            <>
            <div className="ui centered three column row">
                {showDashboard && showTime && <div><Statistics overspeednumber={this.state.overspeednumber} from = {this.state.from} to={this.state.to} volume= {this.state.volume} traveltime = {this.state.traveltimecal}/></div>}
            </div>
            <div className="ui centered column row">
                {showTable && <div><SummaryTable details={this.state.details} /></div>}
            </div>
        
            <div className="sixteen wide column" width="800%" hight="600%">
                {showGraph &&  <div><Graph graphData={this.state.graphData} /></div>}
            </div>
            </>
        )
    }
      
    render() {
       
        return (
        <div className="ui fluid container" style={{ paddingTop: "10px" }}>
            <div>
                <h1 className="ui centered header">Freeway Traffic Dashboard</h1>
               
                <div className="ui grid">
                    <div className="ui centered column row">    
                        <DatePickerDemo handleFromChange = {this.handleFromChange} handleToChange ={this.handleToChange} />
                    </div>
                    
                    <div className="ui centered column row">
                        <SearchBar stations={this.state.stations} handleInputChange={this.handleInputChange} />
                    </div>
                    <div className="row">
                        <div className="five wide column"></div>
                        <div className="four wide column">
                            {this.state.showSpinner &&<XYChart/>}
                        </div>
                    </div> 
                    {!this.state.isloading && this.renderdate()}
                </div>
            </div>
        </div>)
    }
}

export default App;
