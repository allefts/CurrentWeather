import React from "react";
import axios from "axios";

class Weather extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=ea280559dccb736c08acef4ce7ea1175`
      )
      .then((response) => {
        console.log(response);
        this.setState({ persons: response.data });
      });
  }
  render() {
    return <div></div>;
  }
}

export default Weather;
