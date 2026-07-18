import { getWeather } from "./weatherAPI.js";

var citySelect = document.getElementById("city-select");
var weatherBox = document.getElementById("weather-box");

var cities = {
    seoul: {
        name: "서울",
        latitude: 37.5665,
        longitude: 126.9780
    },
    busan: {
        name: "부산",
        latitude: 35.1796,
        longitude: 129.0756
    },
    daegu: {
        name: "대구",
        latitude: 35.8714,
        longitude: 128.6014
    },
    incheon: {
        name: "인천",
        latitude: 37.4563,
        longitude: 126.7052
    },
    gwangju: {
        name: "광주",
        latitude: 35.1595,
        longitude: 126.8526
    },
    daejeon: {
        name: "대전",
        latitude: 36.3504,
        longitude: 127.3845
    },
    ulsan: {
        name: "울산",
        latitude: 35.5384,
        longitude: 129.3114
    },
    sejong: {
        name: "세종",
        latitude: 36.4800,
        longitude: 127.2890
    },
    jeju: {
        name: "제주",
        latitude: 33.4996,
        longitude: 126.5312
    }
};

citySelect.addEventListener("change", async function () {
    var selectedCity = citySelect.value;

    if (selectedCity === "") {
        weatherBox.innerHTML =
            "도시를 선택하면 날씨 정보가 표시됩니다.";
        return;
    }

    var city = cities[selectedCity];

    weatherBox.innerHTML = "로딩 중… ⏳";

    try {
        var weather = await getWeather(
            city.latitude,
            city.longitude
        );

        weatherBox.innerHTML =
            "<strong>🌤️ " + city.name + " 현재 날씨</strong><br>" +
            "현재 온도: " + weather.temperature_2m + "℃<br>" +
            "현재 습도: " + weather.relative_humidity_2m + "%";
    } catch (error) {
        weatherBox.innerHTML =
            "날씨 정보를 불러오지 못했습니다. 😢";

        console.error(error);
    }
});