export const getTheme = (condition) => {
  switch (condition) {
    case "Clear": return "bg-gradient-to-r from-blue-400 to-sky-600";
    case "Rain": return "bg-gradient-to-r from-gray-700 to-gray-900";
    case "Clouds": return "bg-gradient-to-r from-gray-400 to-gray-600";
    case "Snow": return "bg-white text-black";
    default: return "bg-indigo-600";
  }
};