const axios = require('axios');

const BIN_ID = '67f5356d8561e97a50fb1e4b'; // Replace with your JSONBin bin ID
const API_KEY = '$2a$10$BAicwbiHKywfTwVNicn1F.Rn5cyGp6/E1PuJjffLGloZKImg08Swq'; // Replace with your JSONBin secret API key

exports.handler = async () => {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data.record)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch feedbacks', details: err.message })
    };
  }
};
