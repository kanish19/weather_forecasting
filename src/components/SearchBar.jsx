export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 rounded-lg text-black"
      />
      <button
        onClick={onSearch}
        className="bg-black px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}