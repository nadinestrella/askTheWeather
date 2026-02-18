import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ErrorMessage, Loading, SearchBar, WelcomeState } from '../components';

function AIPage() {
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchAI = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setAnswer('');
      setError(null);

      const response = await fetch(
        'https://ask-the-weather-api.vercel.app/api/generate',

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch from server');
      }
      const data = await response.json();
      console.log(data);

      if (!data.text) {
        setError('Empty response from AI. Please try again');
        return;
      }

      setAnswer(data.text);
    } catch (error: unknown) {
      setError('Sorry, I could not get the weather right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="inline-flex flex-row gap-1 items-center mt-5 mb-4 px-4 py-2  bg-purple-500 text-white rounded-xl "
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <SearchBar
        onSearch={handleSearchAI}
        loading={loading}
        buttonText="✨ Search with AI ✨"
        placeholder="Tell me the weather in..."
      />
      {/* Welcome State */}
      {!answer && !loading && !error && <WelcomeState />}

      {/* Error  */}
      {error && <ErrorMessage error={error} />}

      {/* Loading State */}
      {loading && <Loading message="This may take a few seconds" />}

      {/* Answer Display */}
      {answer && (
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-100 mt-6">
          <h2 className="text-purple-900 mb-2">{answer}</h2>
        </div>
      )}
    </div>
  );
}

export default AIPage;
