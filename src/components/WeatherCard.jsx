export default function WeatherCard({ weather, tempUnit, setTempUnit }) {
  if (!weather) return null;
  
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-center mb-6">
      <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
      <div className="flex justify-center items-center gap-4 my-2">
        <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description} 
        />
        <p className="text-4xl font-bold">
          {tempUnit === "C" ? weather.main.temp : (weather.main.temp * 9/5 + 32).toFixed(1)}°{tempUnit}
        </p>
      </div>
      <p className="capitalize">{weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <button 
        onClick={() => setTempUnit(tempUnit === "C" ? "F" : "C")}
        className="mt-3 bg-black px-3 py-1 rounded-lg"
      >
        Show in °{tempUnit === "C" ? "F" : "C"}
      </button>
    </div>
  );
}