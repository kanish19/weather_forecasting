import React, { useState } from "react";

const API_KEY = "8de822150723ec5a19885dfbfec9824b";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found. Please try again.");
        setLoading(false);
        return;
      }

      setWeather(data);

      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data2 = await res2.json();
      const daily = data2.list.filter((_, i) => i % 8 === 0);
      setForecast(daily);
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  const convertTemp = (c) => {
    if (unit === "C") return `${c.toFixed(1)} °C`;
    return `${(c * 9/5 + 32).toFixed(1)} °F`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>🌤️ Weather Dashboard</h1>

      {/* search */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "250px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weather && (
        <div>
          {/* current weather card */}
          <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
          }}>
            <h2 style={{ marginBottom: "8px" }}>
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p style={{ fontSize: "48px", margin: "0", fontWeight: "bold", color: "#333" }}>
              {convertTemp(weather.main.temp)}
            </p>
            <p style={{ textTransform: "capitalize", color: "#666", marginTop: "4px" }}>
              {weather.weather[0].description}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "16px", color: "#555" }}>
              <span>💧 Humidity: {weather.main.humidity}%</span>
              <span>🌬️ Wind: {weather.wind.speed} m/s</span>
              <span>🌡️ Feels like: {convertTemp(weather.main.feels_like)}</span>
            </div>

            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              style={{
                marginTop: "16px",
                padding: "6px 14px",
                border: "1px solid #aaa",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "white",
                fontSize: "14px",
              }}
            >
              Switch to °{unit === "C" ? "F" : "C"}
            </button>
          </div>

          {/* forecast */}
          {forecast.length > 0 && (
            <div>
              <h3 style={{ marginBottom: "12px", color: "#333" }}>5-Day Forecast</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {forecast.map((day, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 120px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "12px",
                      backgroundColor: "#f0f4ff",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                      {new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                    />
                    <p style={{ fontWeight: "bold", margin: "4px 0" }}>{convertTemp(day.main.temp)}</p>
                    <p style={{ fontSize: "12px", color: "#666", textTransform: "capitalize" }}>
                      {day.weather[0].description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}