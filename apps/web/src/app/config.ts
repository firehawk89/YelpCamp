export default {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  mapbox: {
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
  },
};
