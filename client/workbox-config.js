module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{ico,html,json,txt,css}'],
  swDest: 'public/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  sourcemap: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /.+(\/|.woff)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.webp)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.mp3)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.gif)$/,
      handler: 'CacheFirst',
    },
  ],
};
