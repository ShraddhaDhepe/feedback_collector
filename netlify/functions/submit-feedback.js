const axios = require('axios');

const BIN_ID = '67f5356d8561e97a50fb1e4b';        // 🔁 Replace with your actual Bin ID
const API_KEY = '$2a$10$BAicwbiHKywfTwVNicn1F.Rn5cyGp6/E1PuJjffLGloZKImg08Swq';      // 🔁 Replace with your actual API key

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(event.body);

  if (!data.name || !data.email || !data.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  try {
    // 1. Get existing feedbacks
    const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });

    const feedbacks = res.data.record || [];

    // 2. Add new feedback
    const newFeedback = {
      id: Date.now(),
      ...data,
    };

    feedbacks.push(newFeedback);

    // 3. Update the bin with new data
    await axios.put(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`,
      feedbacks,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
          'X-Bin-Versioning': false, // optional: disables versioning
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, feedback: newFeedback }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save feedback', details: err.message }),
    };
  }
};
