const path = require('path');
const ROOT = path.resolve(__dirname, '../')

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: ROOT,
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(ROOT, 'src'),
    };
    // config.resolve.extensions.push(".", ".tsx");

    // Return the altered config
    return config;
  }
}