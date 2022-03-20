const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  images: {
    domains: ['cdn.statically.io', 'thumbs.bookdevelop.club', 'filmix.beer'],
  },
  experimental: {
    esmExternals: false,
  },
});
