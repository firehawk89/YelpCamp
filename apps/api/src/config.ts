import { DEFAULT_LOCALE } from '@repo/constants';

export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  environment: process.env.NODE_ENV || 'development',
  defaultLanguage: DEFAULT_LOCALE,
  database: {
    url: {
      dev: process.env.DATABASE_URL_DEV,
      prod: process.env.DATABASE_URL_PROD,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
