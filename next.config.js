/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  // Remove the static export configuration to enable API routes
  // output: 'export',
  // Enable server-side rendering and API routes for NextAuth
  // Add any additional configuration here
};

module.exports = nextConfig; 