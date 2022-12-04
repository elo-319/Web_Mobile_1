let searchInput = document.getElementById("search-input");
let btn = document.getElementById("btn");
let main = document.getElementById("main");
let date = new Date();

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekdayName = weekday[date.getDay()];

btn.addEventListener("click", () => {
  main.innerHTML = "";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput.value +
      "&appid=e0523b5c61e7908f4bdf611630ff27c6"
  )
    .then((response) => response.json())
    .then((response) => {
      let max = Math.ceil(`${response.main.temp_max}` - 273.15);
      let temp = Math.round(`${response.main.temp}` - 273.15);
      let min = Math.floor(`${response.main.temp_min}` - 273.15);
      let src ="http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";

      

     function findDirection(deg){
        if (deg>11.25 && deg<33.75){
          return "North-northeast";
        }else if (deg>33.75 && deg<56.25){
          return "East-northeast wind";
        }else if (deg>56.25 && deg<78.75){
          return "East";
        }else if (deg>78.75 && deg<101.25){
          return "East-southeast";
        }else if (deg>101.25 && deg<123.75){
          return "East-southeast";
        }else if (deg>123.75 && deg<146.25){
          return "Southeast";
        }else if (deg>146.25 && deg<168.75){
          return "south-southeast";
        }else if (deg>168.75 && deg<191.25){
          return "South";
        }else if (deg>191.25 && deg<213.75){
          return "South-southwest";
        }else if (deg>213.75 && deg<236.25){
          return "Southwest";
        }else if (deg>236.25 && deg<258.75){
          return "West-southwest";
        }else if (deg>258.75 && deg<281.25){
          return "West";
        }else if (deg>281.25 && deg<303.75){
          return "West-northwest";
        }else if (deg>303.75 && deg<326.25){
          return "Northwest";
        }else if (deg>326.25 && deg<348.75){
          return "North-northwest";
        }else{
          return "North"; 
        }
      }

      main.style.display = "block";
      main.innerHTML += `
        <div id="top">
        <h1 id="city-name">${searchInput.value.toUpperCase()}, ${
        response.sys.country
      } </h1>
        <p>${date.toLocaleDateString()}</p>
    </div>
    <div id="center">
        <div id="left">
            <ul>
                <li>${weekdayName}</li>
                <li><h2>${temp} C<sup>o</sup></h2></li>
            </ul>
        </div>
        <div id="right">
            <img width="100px" src=${src} alt="">
            <ul>
            <li style="margin-right:20px;">max</li>
            <li style="margin-right:10px;">min</li>
            </ul>
            <ul>
                <li>${max} C<sup>o</sup></li>
                <li>${min} C<sup>o</sup></li>
            </ul>
        </div>
    </div>
    <div id="bottom">
        <ul>
            <li><b>Humidity:</b> ${response.main.humidity}%</li>
            <li><b>Visibility:</b>  ${response.visibility / 1000}.0km</li>
            <li><b>Pressure:</b> ${response.main.pressure}hPa</li>
            <li><b>Weather Description:</b> ${response.weather[0].description}</li>
            <li><b>Wind:</b> ${response.wind.speed}km</li>
            <li><b>Wind Direction:</b> ${findDirection(response.wind.deg)}</li>

        </ul>
    </div>
        
        `;
    });
});

