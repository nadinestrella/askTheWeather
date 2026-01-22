import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft } from 'lucide-react';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { SearchBar } from '../components/SearchBar';
import { WelcomeState } from '../components/WelcomeState';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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

      const response = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig: { maxOutputTokens: 40, temperature: 0.7 },
      });

      const prompt = `Tell me the current weather in ${city}. Answer in one short sentence.`;

      const result = await response.generateContent(prompt);
      const text = result.response.text();
      if (!text) {
        setError('Empty response from AI. Please try again');
      }
      setAnswer(text.replace(/\*\*/g, ''));
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
        className="inline-flex flex-row gap-1 items-center mt-6 mb-4 px-4 py-2  bg-purple-500 text-white rounded-xl "
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
      {loading && <Loading />}

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
