const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  images: {
    domains: ['ipfs.infura.io', 'raw.githubusercontent.com', 'lh3.googleusercontent.com']
  }
}

module.exports = withPlugins([[withImages]], nextConfig)