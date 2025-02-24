import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    try {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'your_upload_preset',
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
