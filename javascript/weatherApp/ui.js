class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.pressure = document.getElementById('w-pressure');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${weather.main.temp}° Celsius`;
    const image = weather.weather[0].icon;
    this.icon.setAttribute('src', `http://openweathermap.org/img/w/${image}.png`);
    this.humidity.textContent = `Relative humidity: ${weather.main.humidity}`;
    this.feelsLike.textContent = `Feels like: ${weather.main.feels_like}° Celsius`;
    this.pressure.textContent = `Atmospheric pressure: ${weather.main.pressure} m/s`;
    this.wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;


  }
}