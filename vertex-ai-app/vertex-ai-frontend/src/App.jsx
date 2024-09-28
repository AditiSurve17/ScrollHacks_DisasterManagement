import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    householdDetails: '',
    location: '',
    housingType: '',
    localThreats: '',
    specificNeeds: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false); // Adding loading state

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true during submission
    try {
      const response = await fetch('http://localhost:3001/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedPlan(data);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false); // Set loading state back to false after submission
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Personalized Emergency Preparedness Plan</h1>
      
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Household Details</h2>
          <textarea
            name="householdDetails"
            placeholder="Enter details about your household"
            value={formData.householdDetails}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Location Information</h2>
          <input
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
          />
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Housing Type</h2>
          <select
            name="housingType"
            value={formData.housingType}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="mobile-home">Mobile Home</option>
          </select>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Specific Needs</h2>
          <textarea
            name="specificNeeds"
            placeholder="Enter specific needs (e.g., medical conditions, pets)"
            value={formData.specificNeeds}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Submit'}
            </button>
          </div>
        </div>
      )}

      {generatedPlan && (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Generated Plan</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{generatedPlan}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
