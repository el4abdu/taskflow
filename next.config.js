/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  output: 'export',
  // Dynamic API routes won't work with static export
  // We'd need to modify our approach to use external API services
  // Add any additional configuration here
};

module.exports = nextConfig; 