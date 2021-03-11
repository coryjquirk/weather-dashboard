# Weather Dashboard
A stripped down weather app to display current weather conditions and a 5-day forecast. Utilizes client-side storage and the [OpenWeather API](https://openweathermap.org/).

* Deployed application: https://coryjquirk.github.io/weather-dashboard/index.html
* Repository: [https://github.com/coryjquirk/weather-dashboard](https://github.com/coryjquirk/weather-dashboard)
### Demo
<img src="https://coryjquirk.github.io/weather-dashboard/weatherdashboard.gif" alt="demo screencap gif">

## Tools Used
* JavaScript
* Bootstrap & Bootstrap Grid
* Local storage
* PWA
  * service-worker.js
  * manifest.webmanifest
* OpenWeather for all weather data and weather icons (https://openweathermap.org/)
* Date generator: (https://www.ricocheting.com/code/javascript/html-generator/date-time-clock)

## Features
* Displays Temperature (°F), Humidity (%), Wind Speed (MPH), and the UV index at the current time.
* Displays a 5-day forecast with temperature and humidity for each day.
* UV Index is color coded green-yellow-orange-red to indicate favorable to unfavorable conditions.
* Mobile responsive: page adapts to the size of a browser window.

## Features in Development
* PWA - installable app
* React.js framework
* Function:
  * C/Kelvin unit conversion
  * Search by postal code
  * Map integration
* Front-end design:
  * Dark mode
  * Further weather condition-based design 

## License
* The Unlicense

## Thank You
* [Owen Höglund](https://github.com/Othedough) for helping me streamline and refactor the JavaScript, specifically the way API responses were being passed to the DOM.
