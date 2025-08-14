const myKey = "4e09b3b3fa38bece6ce1123494e43d88";
const myLat = "32.2968";
const myLon = "-26.4194";

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

document.addEventListener("DOMContentLoaded", () => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`; // or units=imperial

    async function apiFetch() {
        try {
            const response = await fetch(urlWeather);
            if (!response.ok) throw new Error(await response.text());

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Weather fetch error:", error);
        }
    }

    const displayResults = (data) => {
        const eventMainBox = document.querySelector("#weather-main");
        eventMainBox.innerHTML = "";

        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const city = data.name;

        // Get local day from API timestamp
        const localTime = new Date(data.dt * 1000);
        const dayIndex = localTime.getDay();
        const weekdayName = weekdays[dayIndex];

        eventMainBox.innerHTML = `
            <div class="current-weather">
                <h4><span id="city-name">${city}</span></h4>
                <h5>
                    Temp: <span id="current-temp">${temp}&deg;C</span><br>
                    <span>${weekdayName}</span>
                </h5>
                <figure>
                    <img id="weather-icon" src="${iconSrc}" alt="${desc}">
                    <figcaption>${desc}</figcaption>
                </figure>
            </div>
        `;
    };

    apiFetch();
});
