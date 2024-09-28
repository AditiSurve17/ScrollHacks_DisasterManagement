const express = require('express');
const cors = require('cors');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(express.json());
app.use(cors());

const project = 'tidal-fiber-434419-g0';
const location = 'us-central1';
const textModel = 'gemini-1.0-pro';
const vertexAI = new VertexAI({ project: project, location: location });
const generativeModel = vertexAI.getGenerativeModel({ model: textModel });

// Endpoint to generate emergency preparedness plan
app.post('/api/generate-plan', async (req, res) => {
  const userData = req.body;

  // Create a prompt based on the user data
  const prompt = `
  Emergency Preparedness Plan for a household with the following details:
  - Location: ${userData.location}
  - Household Members: ${userData.householdDetails}
  - Housing Type: ${userData.housingType}
  - Local Threats: ${userData.localThreats}
  - Specific Needs: ${userData.specificNeeds}

  Please generate a detailed preparedness plan that includes:
  1. An emergency kit checklist.
  2. Evacuation routes and safety tips.
  3. Special considerations for pets, medical needs, and disabilities.
  4. Local emergency contacts and resources.
  `;

  try {
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    const result = await generativeModel.generateContent(request);
    const response = result.response;
    res.json(response.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).send('Error generating emergency plan');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
