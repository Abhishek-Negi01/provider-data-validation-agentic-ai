import React from 'react';

function ManualReview({ provider, onReview }) {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Manual Review Required</h2>
            <p className="text-sm text-gray-500 mt-1">AI-detected issues require human verification</p>
          </div>
          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
            Confidence: {provider.confidence_score}%
          </span>
        </div>

        {/* Provider Information Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{provider.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Provider ID:</span>
              <span className="ml-2 font-medium">{provider.provider_id}</span>
            </div>
            <div>
              <span className="text-gray-600">Specialty:</span>
              <span className="ml-2 font-medium">{provider.specialty}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 font-medium">{provider.phone}</span>
            </div>
            <div>
              <span className="text-gray-600">License:</span>
              <span className="ml-2 font-medium">{provider.license_number}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Address:</span>
              <span className="ml-2 font-medium">{provider.address}</span>
            </div>
          </div>
        </div>

        {/* Issues Detected */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
              {provider.issues.length}
            </span>
            Issues Detected by AI Validation Agent
          </h4>
          <ul className="space-y-2">
            {provider.issues.map((issue, idx) => (
              <li key={idx} className="bg-red-50 border-l-4 border-red-500 p-4 text-red-800 flex items-start">
                <span className="text-xl mr-3">⚠️</span>
                <span className="flex-1">{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Field Comparison */}
        {Object.keys(provider.suggested_values).length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              AI-Suggested Corrections
            </h4>
            <div className="space-y-6">
              {Object.entries(provider.suggested_values).map(([field, suggestedValue]) => (
                <div key={field} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Field Under Review
                    </label>
                    <div className="font-semibold text-gray-800 text-lg mt-1">
                      {field.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-50 border-2 border-gray-300 p-4 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">
                        Current Value
                      </label>
                      <div className="text-gray-800 font-medium">
                        {provider[field] || <span className="text-red-500 italic">Missing</span>}
                      </div>
                    </div>
                    <div className="text-3xl text-gray-400">→</div>
                    <div className="flex-1 bg-green-50 border-2 border-green-400 p-4 rounded-lg">
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">
                        AI-Suggested Value
                      </label>
                      <div className="text-gray-800 font-medium">{suggestedValue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t-2">
          <button
            onClick={() => onReview('approve')}
            className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <span className="text-xl">✓</span>
            <span>Approve & Apply Corrections</span>
          </button>
          <button
            onClick={() => onReview('reject')}
            className="flex-1 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <span className="text-xl">✗</span>
            <span>Reject & Keep Original</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManualReview;
