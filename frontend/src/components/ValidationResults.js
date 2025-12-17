import React from 'react';

function ValidationResults({ run, onViewDetails }) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Validation Results - Run {run.run_id}</h2>
          <p className="text-sm text-gray-500 mt-1">Processed on {new Date(run.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
            {run.total_providers} Total
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            {run.validated} Valid
          </span>
          <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
            {run.flagged} Flagged
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Provider Name</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Specialty</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Confidence</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {run.results.map(provider => (
                <tr key={provider.provider_id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm">{provider.provider_id}</td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{provider.name}</div>
                    <div className="text-xs text-gray-500">{provider.email || 'No email'}</div>
                  </td>
                  <td className="py-4 px-4 text-sm">{provider.specialty}</td>
                  <td className="py-4 px-4 text-sm">{provider.phone}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      provider.status === 'Valid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            provider.confidence_score >= 90 
                              ? 'bg-green-500' 
                              : provider.confidence_score >= 70 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${provider.confidence_score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{provider.confidence_score}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {provider.status === 'Flagged' && (
                      <button
                        onClick={() => onViewDetails(provider)}
                        className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 text-sm font-medium"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ValidationResults;
