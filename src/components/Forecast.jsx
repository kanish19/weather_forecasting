export default function Forecast({ forecast, tempUnit }) {
  if (!forecast) return null;

  const dailyForecast = forecast.list.filter((_, i) => i % 8 === 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {dailyForecast.map((day, i) => (
        <div key={i} className="bg-white/20 backdrop-blur-md p-4 rounded-lg text-center">
          <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
          <img 
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
            alt={day.weather[0].description} 
            className="mx-auto"
          />
          <p className="font-bold">
            {tempUnit === "C" ? day.main.temp : (day.main.temp * 9/5 + 32).toFixed(1)}°{tempUnit}
          </p>
          <p className="capitalize">{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}