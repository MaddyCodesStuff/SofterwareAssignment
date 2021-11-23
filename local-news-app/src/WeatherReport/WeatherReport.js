import React from "react";
import "./WeatherReport.css";
class WeatherReport extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          woeid: 0,
          weather: undefined
        };
        this.getCoords = this.getCoords.bind(this);
        this.getLocationFromCoords = this.getLocationFromCoords.bind(this);
        this.getWeatherInfo = this.getWeatherInfo.bind(this);
        this.geoError = this.geoError.bind(this)
      }
    componentDidMount(){

        navigator.geolocation.getCurrentPosition(this.getCoords, this.geoError);

    }
    geoError(){
        this.setState({
            woeid : 2471217
        })
        this.getWeatherInfo(this.state.woeid)
    }
    getCoords(pos){
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })

        this.getLocationFromCoords();
    }
     getLocationFromCoords(){
        
        fetch("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=" +this.state.latitude + "," + this.state.longitude)
        .then(result => result.json())
        .then(data => this.setState({woeid: data[0].woeid}))
        .then(func => this.getWeatherInfo(this.state.woeid))
    }
    getWeatherInfo(woe){
        if(woe!== 0){
            fetch("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + woe)
            .then(res => res.json())
            .then(data => this.setState({weather: data}))
        }
    }

    render(){
       if(this.state.weather){
            var options = { weekday: 'long', month: 'long', day: 'numeric' };
            let localDate = new Date(this.state.weather.time).toLocaleDateString("En-Us", options);
            return(
                <div className = "weatherInfo">
                    <h1 className="update">Your Local Weather Report</h1>
                    <img style={{width: 175, height: 175}} src={"https://www.metaweather.com/static/img/weather/png/" + this.state.weather.consolidated_weather[0].weather_state_abbr + ".png"} />
                    <p >Hmmm... looks like {this.state.weather.consolidated_weather[0].weather_state_name} in the {this.state.weather.title} area</p>
                    <p >Current Tempature: {Math.round(this.state.weather.consolidated_weather[0].the_temp * 9/5 + 32) } Degrees, Farenheight</p>
                    <p >As Of: {localDate}</p>
                </div>    
            )
       }
        return(<p>Loading your Weather...</p>)
    }   
}

export default WeatherReport;
