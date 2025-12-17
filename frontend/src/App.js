import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ValidationResults from './components/ValidationResults';
import ManualReview from './components/ManualReview';

const API_BASE = 'http://localhost:8000/api';

function App() {
  const [view, setView] = useState('dashboard');
  const [runs, setRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    loadRuns();
  }, []);

  const loadRuns = async () => {
    const response = await fetch(`${API_BASE}/runs`);
    const data = await response.json();
    setRuns(data);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE}/validate`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    await loadRuns();
    setSelectedRun(result);
    setView('results');
  };

  const handleViewResults = (run) => {
    setSelectedRun(run);
    setView('results');
  };

  const handleViewDetails = (provider) => {
    setSelectedProvider(provider);
    setView('review');
  };

  const handleReview = async (action) => {
    await fetch(`${API_BASE}/review/${selectedRun.run_id}/${selectedProvider.provider_id}?action=${action}`, {
      method: 'POST',
    });
    
    await loadRuns();
    const updatedRun = runs.find(r => r.run_id === selectedRun.run_id);
    setSelectedRun(updatedRun);
    setView('results');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Provider Data Validation Dashboard</h1>
          {view !== 'dashboard' && (
            <button
              onClick={() => setView('dashboard')}
              className="border border-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ← Back to Dashboard
            </button>
          )}
        </div>
      </header>

      {view === 'dashboard' && (
        <Dashboard runs={runs} onUpload={handleUpload} onViewResults={handleViewResults} />
      )}

      {view === 'results' && selectedRun && (
        <ValidationResults run={selectedRun} onViewDetails={handleViewDetails} />
      )}

      {view === 'review' && selectedProvider && (
        <ManualReview provider={selectedProvider} onReview={handleReview} />
      )}
    </div>
  );
}

export default App;
