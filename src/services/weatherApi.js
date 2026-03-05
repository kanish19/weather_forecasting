const API_KEY = "8de822150723ec5a19885dfbfec9824b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
};

export const fetchForecast = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("Forecast not available");
  return res.json();
};