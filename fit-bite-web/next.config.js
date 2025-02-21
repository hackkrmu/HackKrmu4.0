/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

}

module.exports = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
      );
      return config;
    },
  };
  
module.exports = nextConfig
