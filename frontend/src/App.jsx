import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage'; //

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-indigo-600 text-white p-4 shadow-md text-center">
          <h1 className="text-2xl font-bold">Life is Hard at Corporate</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* */}
            <Route path="/post/:postId" element={<PostDetailPage />} /> {/* */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;