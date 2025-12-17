import React, { useRef } from 'react';

function Dashboard({ runs, onUpload, onViewResults }) {
  const fileInputRef = useRef();
  const latestRun = runs[runs.length - 1];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-2 font-medium">Total Providers</div>
              <div className="text-4xl font-bold text-gray-800">{latestRun?.total_providers || 0}</div>
            </div>
            <div className="text-5xl text-blue-600 opacity-20">📊</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-2 font-medium">Validated Providers</div>
              <div className="text-4xl font-bold text-gray-800">{latestRun?.validated || 0}</div>
            </div>
            <div className="text-5xl text-green-600 opacity-20">✓</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-2 font-medium">Flagged Providers</div>
              <div className="text-4xl font-bold text-gray-800">{latestRun?.flagged || 0}</div>
            </div>
            <div className="text-5xl text-orange-600 opacity-20">⚠</div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-lg shadow-lg text-center mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <h3 className="text-white text-xl font-semibold mb-3">Upload Provider Data for AI Validation</h3>
        <p className="text-blue-100 text-sm mb-6">
          Our AI agents will extract, validate, and score your provider data automatically
        </p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
        >
          📤 Upload CSV File
        </button>
        <p className="text-blue-200 text-xs mt-4">
          Supported format: CSV with provider information
        </p>
      </div>

      {/* Recent Validation Runs */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Validation Runs</h2>
          {runs.length > 0 && (
            <span className="text-sm text-gray-500">{runs.length} total runs</span>
          )}
        </div>
        
        {runs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-20">📋</div>
            <p className="text-gray-500 text-lg">No validation runs yet</p>
            <p className="text-gray-400 text-sm mt-2">Upload provider data to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Run ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Validated</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Flagged</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Success Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {runs.slice().reverse().map(run => {
                  const successRate = Math.round((run.validated / run.total_providers) * 100);
                  return (
                    <tr key={run.run_id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{run.run_id}</td>
                      <td className="py-3 px-4 text-sm">{new Date(run.timestamp).toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm font-semibold">{run.total_providers}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">{run.validated}</td>
                      <td className="py-3 px-4 text-orange-600 font-semibold">{run.flagged}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          successRate >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : successRate >= 60 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {successRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onViewResults(run)}
                          className="text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm font-medium transition"
                        >
                          View Results
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
