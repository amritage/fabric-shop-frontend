// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
  },
};