window.addEventListener("load", () => {
  let timeZone = document.querySelector(".timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let Temperature = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/865600711773af8a896595316781d0c0/${lat},${long}`;

        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data => {
            const { summary, temperature } = data.currently;

            timeZone.textContent = data.timezone;
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            let celcius = (temperature - 32) * (5 / 9);
            Temperature.addEventListener("click", () => {
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celcius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            });
          });
      },
      function() {
        alert("Please Allow GeoLocation To Work Application.");
      }
    );
  }
});
