/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-portfolio-test',
  assetPrefix: '/my-portfolio-test/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;