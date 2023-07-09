/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'localhost',
      '127.0.0.1',
      'i.pravatar.cc',
    ],
  },
}

module.exports = nextConfig
