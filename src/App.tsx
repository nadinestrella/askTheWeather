import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AIPage from './pages/AIPage';
import { Header } from './components/Header';

import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ia" element={<AIPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
