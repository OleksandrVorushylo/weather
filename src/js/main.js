// Hints
// Take index of element in HTMLList
// let index = [].indexOf.call(
//   peopleArr,
//   document.querySelector(`.people.active`)
// );

$(document).ready(function ($) {
  // AOS animation init
  AOS.init({
    startEvent: "load",
    disableMutationObserver: false,
  });
  AOS.refresh(true);

  // Default Functions
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function hasSomeParentTheClass(element, classname) {
    try {
      if (element.className.split(" ").indexOf(classname) >= 0) return true;
    } catch {
      return false;
    }
    return (
      element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
    );
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const granimInstance = new Granim({
    element: '#canvas-complex',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          [
            {color: '#833ab4', pos: .2},
            {color: '#fd1d1d', pos: .8},
            {color: '#38ef7d', pos: 1}
          ], [
            {color: '#40e0d0', pos: 0},
            {color: '#ff8c00', pos: .2},
            {color: '#ff0080', pos: .75}
          ],
        ]
      }
    }
  });

  // lottie.loadAnimation({
  //   container: document.querySelector(`.lottie-logo`),
  //   renderer: "svg",
  //   loop: true,
  //   autoplay: true,
  //   path: "./js/lottie/logoloop.json",
  // });

  // ---- ПРИМЕРЫ ФУНКЦИЙ ----



  // Погода

  let weather = {
    apiKey : '35b468389898705619b125047bfbbc4d',
    fetchWeather: function (city) {
      fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          this.apiKey
      )
          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    // fetchWeather: function (city) {
    //   fetch("https://api.openweathermap.org/data/2.5/weather?q="
    //           + city
    //           + "&appid="
    //           + this.apiKey
    //         )
    //       .then(function (resp) {return resp.json() })
    //       .then(function (data) {
    //         // document.querySelector('.weather__name').textContent = data.name;
    //         // document.querySelector('.weather__temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    //         // document.querySelector('.weather__temperature-min').innerHTML = Math.round(data.main.temp_min - 273) + '&deg;';
    //         // document.querySelector('.weather__temperature-max').innerHTML = Math.round(data.main.temp_max - 273) + '&deg;';
    //         // document.querySelector('.weather__info').textContent = data.weather[0]['description'];
    //         // document.querySelector('.weather__speed').textContent = data.wind.speed;
    //         console.log(data)
    //       })
    // },
    displayWeather: function (data) {
      const {name} = data;
      const {icon, description} = data.weather[0];
      const {temp, temp_min, temp_max} = data.main;
      const {speed} = data.wind;
      console.log(data)
      document.querySelector('.weather__name').textContent = name;
      document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector('.weather__info span').textContent = description;
      document.querySelector('.weather__temperature').innerHTML = Math.round(temp - 273) + '&deg;';
      document.querySelector('.weather__temperature-min').innerHTML = Math.round(temp_min - 273) + '&deg;';
      document.querySelector('.weather__temperature-max').innerHTML = Math.round(temp_max - 273) + '&deg;';
      document.querySelector('.weather__speed').textContent = speed + " km/h";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".weather__search").value);
    },
  }
  document.querySelector(".weather__btn").addEventListener("click", function () {
    weather.search();
  });
  document.querySelector(".weather__search").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          weather.search();
        }
      });

  weather.fetchWeather("London");
});
