// Clock functionality
function realTime() {
  const dateTime = new Date();
  const hrs = dateTime.getHours();
  const min = dateTime.getMinutes();
  const sec = dateTime.getSeconds();
  const session = hrs >= 12 ? "PM" : "AM";

  document.querySelector("#hours").textContent = (hrs % 12 || 12)
    .toString()
    .padStart(2, "0");
  document.querySelector("#minutes").textContent = min
    .toString()
    .padStart(2, "0");
  document.querySelector("#seconds").textContent = sec
    .toString()
    .padStart(2, "0");
  document.querySelector("#session").textContent = session;
}

setInterval(realTime, 1000);

// Weather and UV Index functionality
const weather = {
  apiKey: "65b6e2a8c3622af3622a3030c6a9e1df",
  uvApiKey: "fcb409146c7459a9e8f703e7e1d42d04",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((err) => {
        console.error("Weather fetch error:", err);
        this.showError("City not found. Please try again.");
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    const { lon, lat } = data.coord;

    document.querySelector(".city").textContent = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = `${temp.toFixed(1)}°C`;

    this.fetchUVIndex(lat, lon);
    this.setBackgroundImage(name);
  },
  fetchUVIndex: function (lat, lon) {
    const options = {
      method: "GET",
      headers: {
        "x-access-token": this.uvApiKey,
        "Content-Type": "application/json",
      },
    };

    fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch UV data");
        }
        return response.json();
      })
      .then((data) => this.displayUVIndex(data))
      .catch((err) => {
        console.error("UV Index fetch error:", err);
        this.showError("Failed to fetch UV data. Please try again later.");
      });
  },
  displayUVIndex: function (data) {
    const uv = data.result.uv;
    document.querySelector(".city").textContent += ` (UV Index: ${uv.toFixed(
      1
    )})`;

    let recommendation;
    if (uv === 0) {
      recommendation = "No protection needed. You can safely stay outside.";
    } else if (uv <= 2) {
      recommendation =
        "Low UV. Some protection recommended for prolonged outdoor activities.";
    } else if (uv <= 5) {
      recommendation =
        "Moderate UV. Seek shade during midday hours and wear protective clothing.";
    } else if (uv <= 7) {
      recommendation =
        "High UV. Protection required. Reduce time in the sun between 10 a.m. and 4 p.m.";
    } else if (uv <= 10) {
      recommendation =
        "Very high UV. Extra protection needed. Avoid being outside during midday hours.";
    } else {
      recommendation =
        "Extreme UV. Take all precautions. Avoid being outside during midday hours.";
    }

    document.querySelector(".uv-recommendation").textContent = recommendation;
  },
  setBackgroundImage: function (city) {
    const accessKey = "DhlopmPFH7A19ZcxJ8D36iR9p39nyzLzzGwfKVt2T2Y"; // Replace with your actual Unsplash access key
    const url = `https://api.unsplash.com/photos/random?query=${city}&client_id=${accessKey}&orientation=landscape`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch background image");
        }
        return response.json();
      })
      .then((data) => {
        const imgUrl = data.urls.full;
        document.body.style.backgroundImage = `url('${imgUrl}')`;
        console.log(`Background image for ${city} loaded successfully`);
      })
      .catch((error) => {
        console.error(`Error loading background image for ${city}:`, error);
        // Fallback to a default image or keep the previous image
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?nature,landscape')`;
        console.log("Fallback background image loaded");
      });
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  showError: function (message) {
    document.querySelector(".city").textContent = message;
    document.querySelector(".icon").src = "";
    document.querySelector(".description").textContent = "";
    document.querySelector(".temp").textContent = "";
    document.querySelector(".uv-recommendation").textContent = "";
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

// Initial weather display (you can set a default city)
weather.fetchWeather("London");
