const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.resolve('feedback.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const feedbacks = JSON.parse(data);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbacks)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read feedbacks' })
    };
  }
};
