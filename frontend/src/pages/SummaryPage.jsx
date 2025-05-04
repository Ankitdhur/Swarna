import React from 'react';
import { useAuth } from '../context/AuthContext';

function SummaryPage() {
  const { json } = useAuth();

  const extractedInstances = json?.extracted_instances;

  if (!extractedInstances || extractedInstances.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        No summary data available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Extracted Summary</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {extractedInstances.map((instance, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">{instance.id}</h3>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium text-gray-700">Classes:</span>{' '}
              {instance.classes.join(', ')}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {Object.entries(instance.properties).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}:</span>{' '}
                  {Array.isArray(value) ? value.join(', ') : value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryPage;
