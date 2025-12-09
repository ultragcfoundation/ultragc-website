// update-metadata.js
const cloudinary = require('cloudinary').v2;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const { public_id, caption, category } = JSON.parse(event.body || '{}');
  if (!public_id) return { statusCode: 400, body: JSON.stringify({ error: 'missing public_id' }) };

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // set context (custom metadata)
    const result = await cloudinary.api.update(public_id, {
      context: `caption=${caption}|category=${category}`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, result })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
