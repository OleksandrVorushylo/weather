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

  // Аккордеон

  const accordion = () => {
    const btn = document.querySelectorAll('.accordion-btn'),
        item = document.querySelectorAll('.accordion-item');
    const removeContent = () => {
      const btnActive = document.querySelectorAll('.accordion-btn--active'),
          itemActive = document.querySelectorAll('.accordion-item--active');
      btnActive.forEach((elem)=>{
        elem.classList.remove('accordion-btn--active');
      })
      itemActive.forEach((elem)=>{
        elem.classList.remove('accordion-item--active');
      })
    };
    if (document.querySelector('.accordion')) {
      btn.forEach((elem, index) => {
        elem.addEventListener('click', (event) => {
          let target = event.target;
          target = target.closest('.accordion-btn');
          if (target.closest('.accordion-btn--active')) {
            elem.classList.remove('accordion-btn--active')
            item[index].classList.remove('accordion-item--active')
          } else {
            removeContent(); // -- Не запускать, если не нужно, что бы предыдущий элемент закрывался автоматически
            elem.classList.toggle('accordion-btn--active')
            item[index].classList.toggle('accordion-item--active')
          }
        })
      })
    }
  };
  accordion();

  // Табы

  const tabs = () => {
    const tabsParent = document.querySelector('.tab-links'),
        tab = document.querySelectorAll('.tab-link'),
        tabContent = document.querySelectorAll('.tab-item');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('tab-link--active')
          tabContent[i].classList.add('tab-item--active')
        } else {
          tab[i].classList.remove('tab-link--active')
          tabContent[i].classList.remove('tab-item--active')
        }
      }
    }
    if (document.querySelector('.tab-links')) {
      tabsParent.addEventListener('click', event => {
        let target = event.target;
        target = target.closest('.tab-link');
        if (target) {
          tab.forEach((elem, i) => {
            if (elem === target) {
              toggleTabContent(i)
            }
          })
        }
      })
    }
  }
  tabs();

  // Модальное окно

  const popup = () => {
    const popupBtn = document.querySelectorAll('.toggle-popup'),
        popup = document.querySelector('.popup'),
        popupItem = document.querySelector('.popup-item'),
        popupClose = document.querySelector('.close-popup');

    if (document.querySelector('.popup')) {
      popupBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          popup.style.display = 'block';
        })
      })
      popup.addEventListener('click', (event) => {
        let target = event.target;
        if (target === popupClose) {
          popup.style.display = 'none';
        } else {
          target = target.closest('.popup-item');
          if (!target) {
            popup.style.display = 'none';
          }
        }
      })
    }
  }
  popup()

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

  weather.fetchWeather("Denver");
});
