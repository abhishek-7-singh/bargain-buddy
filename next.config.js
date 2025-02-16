/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      domains: ['m.media-amazon.com',"5.imimg.com","www.flipkart.com","fuaark.com","www.fuaark.com"]
    }
  }
  
  module.exports = nextConfig