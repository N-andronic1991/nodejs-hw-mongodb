import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  if (!file) return;
  try {
    const res = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);
    return res.secure_url;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
