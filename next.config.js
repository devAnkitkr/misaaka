/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/cache.js');
    }
    return config;
  },
  env: {
    BASE_URL:
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:3000'
        : process.env.BASE_URL,
    EMAIL_JS_USER_ID: process.env.EMAIL_JS_USER_ID,
    EMAIL_JS_SERVICE_ID: process.env.EMAIL_JS_SERVICE_ID,
    EMAIL_JS_TEMPLATE_ID: process.env.EMAIL_JS_TEMPLATE_ID,
  },
};
