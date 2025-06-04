import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">Life is Hard at Corporate</h1>
      </header>
      <main className="container mx-auto p-4">
        <HomePage />
      </main>
    </div>
  );
}

export default App;