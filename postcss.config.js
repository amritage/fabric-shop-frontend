// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require('@fullhuman/postcss-purgecss');

const purge = purgecss({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
    ...(process.env.NODE_ENV === 'production' ? { purge } : {}),
  },
};