import React from "react";
import axios from "axios";
import "./App.css";
import { FiSun } from "react-icons/fi";
import { FaSnowflake } from "react-icons/fa";
import { IoIosRainy } from "react-icons/io";
import { TiWeatherCloudy } from "react-icons/ti";
import { RiTempColdFill } from "react-icons/ri";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.icons = [
      <FiSun />,
      <IoIosRainy />,
      <TiWeatherCloudy />,
      <FaSnowflake />,
      <RiTempColdFill />,
    ];
  }
  state = {
    weather: null,
    temp: null,
    feelsLike: null,
    description: null,
    mainWeather: null,
    location: null,
    icon: null,
    backgroundPic: null,
  };

  //ON RENDER, CALL THE API AND RECEIVE THE WEATHER OBJECT BACK
  componentDidMount() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=ea280559dccb736c08acef4ce7ea1175`
      )
      .then((res) => {
        this.setState({
          weather: res.data, //Entire Object
          temp: Math.floor(res.data.main.temp), //Actual Temp
          feelsLike: Math.floor(res.data.main.feels_like), //Feels Like Temp
          mainWeather: res.data.weather[0].main, //Cloudy or Sunny
          description: res.data.weather[0].description, //Description
          location: res.data.name, //Place
        });
        this.checkIcon();
      });
  }

  checkIcon = () => {
    const currentTemp = this.state.temp;
    if (currentTemp < 50) {
      this.setState({ icon: this.icons[3] });
    } else if (currentTemp < 50 && !currentTemp < 60) {
      this.setState({ icon: this.icons[4] });
    } else if (currentTemp < 60) {
      this.setState({ icon: this.icons[2] });
    } else if (currentTemp < 70) {
      this.setState({ icon: this.icons[1] });
    } else {
      this.setState({ icon: this.icons[0] });
    }
  };

  render() {
    const degrees = <span style={{ marginLeft: ".25rem" }}>&#176;F</span>;
    return (
      <div>
        <div className="informationWrapper">
          <h2 className="location">{this.state.location}, TX</h2>
          <div className="line"></div>
          <div className="iconWrapper">{this.state.icon}</div>
          <div className="informationContainer">
            <div className="tempWrapper">
              <h1 className="temp">
                <span>
                  {this.state.temp}
                  {degrees}
                </span>
              </h1>
              <h3 className="feelslikeWrapper">
                <span className="feelsLike">Feels like:</span>
                {this.state.feelsLike}
                {degrees}
              </h3>
            </div>
            <div className="mainWrapper">
              <h2 className="mainWeather">{this.state.mainWeather}</h2>
              <h3 className="description">{this.state.description}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
