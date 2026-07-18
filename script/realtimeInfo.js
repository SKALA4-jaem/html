import { getWeather } from "./weatherAPI.js";

var citySelect = document.getElementById("city-select");
var weatherBox = document.getElementById("weather-box");

var cities = {
    seoul: { name: "서울", latitude: 37.5665, longitude: 126.9780 },
    busan: { name: "부산", latitude: 35.1796, longitude: 129.0756 },
    daegu: { name: "대구", latitude: 35.8714, longitude: 128.6014 },
    incheon: { name: "인천", latitude: 37.4563, longitude: 126.7052 },
    gwangju: { name: "광주", latitude: 35.1595, longitude: 126.8526 },
    daejeon: { name: "대전", latitude: 36.3504, longitude: 127.3845 },
    ulsan: { name: "울산", latitude: 35.5384, longitude: 129.3114 },
    sejong: { name: "세종", latitude: 36.4800, longitude: 127.2890 },
    suwon: { name: "수원", latitude: 37.2636, longitude: 127.0286 },
    chuncheon: { name: "춘천", latitude: 37.8813, longitude: 127.7298 },
    cheongju: { name: "청주", latitude: 36.6424, longitude: 127.4890 },
    jeonju: { name: "전주", latitude: 35.8242, longitude: 127.1480 },
    mokpo: { name: "목포", latitude: 34.8118, longitude: 126.3922 },
    andong: { name: "안동", latitude: 36.5684, longitude: 128.7294 },
    changwon: { name: "창원", latitude: 35.2281, longitude: 128.6811 },
    jeju: { name: "제주", latitude: 33.4996, longitude: 126.5312 }
};

function makeWeatherMessage(temperature, humidity) {
    if (temperature >= 30) {
        return "아주 더운 날이에요. 물과 시원한 그늘을 꼭 챙겨요! 🧊";
    }

    if (temperature >= 25) {
        return "조금 더운 날씨예요. 가볍고 시원하게 입어보세요! ☀️";
    }

    if (temperature <= 10) {
        return "쌀쌀한 날이에요. 따뜻한 겉옷을 챙겨요! 🧣";
    }

    if (humidity >= 80) {
        return "습도가 높아요. 우산이나 제습 아이템을 확인해보세요! ☔";
    }

    return "산책하거나 활동하기 좋은 날씨예요! 🌿";
}

citySelect.addEventListener("change", async function () {
    var selectedCity = citySelect.value;

    if (selectedCity === "") {
        weatherBox.innerHTML =
            "도시를 선택하면 오늘의 온도와 습도를 알려드릴게요.";
        return;
    }

    var city = cities[selectedCity];

    if (!city) {
        weatherBox.innerHTML =
            "선택한 도시의 위치 정보가 아직 등록되지 않았어요.";
        return;
    }

    weatherBox.innerHTML = "날씨를 불러오는 중이에요… ⏳";

    try {
        var weather = await getWeather(
            city.latitude,
            city.longitude
        );

        var temperature = weather.temperature_2m;
        var humidity = weather.relative_humidity_2m;
        var weatherMessage = makeWeatherMessage(temperature, humidity);
        var updatedTime = new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        weatherBox.innerHTML =
            "<strong>🌤️ " + city.name + "의 현재 날씨</strong><br>" +
            "온도 <b>" + temperature + "℃</b> · " +
            "습도 <b>" + humidity + "%</b><br>" +
            "<span class='weather-message'>" + weatherMessage + "</span><br>" +
            "<small>마지막 확인 " + updatedTime + "</small>";
    } catch (error) {
        weatherBox.innerHTML =
            "날씨 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요. 😢";

        console.error(error);
    }
});
