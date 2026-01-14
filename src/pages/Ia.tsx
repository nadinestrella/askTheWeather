import { ArrowLeft } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

function Ia() {
  const [city, setCity] = useState('');

  const handleSubmit = (event: FormEvent) => {
    // event.preventDefault();
    // onSearch(city);
    // setCity('');
    console.log('Searching weather wit IA');
  };
  return (
    <div>
      <Link
        to="/"
        className="inline-flex flex-row gap-1 items-center mt-6 mb-4 px-4 py-2  bg-purple-500 text-white rounded-xl "
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            // value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Tell me the weather in..."
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 transition-all placeholder:text-purple-300"
            // disabled={loading}
          ></input>
        </label>
        <button
          type="submit"
          // disabled={loading}
          className="mt-4 w-full bg-linear-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Search with IA ✨
        </button>
      </form>
    </div>
  );
}

export default Ia;
