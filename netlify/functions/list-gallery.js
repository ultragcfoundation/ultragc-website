const cloudinary = require('cloudinary').v2;

exports.handler = async function () {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.search
      .expression('tags=ultragc_gallery')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result.resources),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
