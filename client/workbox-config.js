module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{ico,json,txt,css}'],
  swDest: 'public/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  sourcemap: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /.+(\/|.woff)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.woff2)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.png)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.jpg)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.+(\/|.svg)$/,
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
    {
      urlPattern: /.+(\/|.webm)$/,
      handler: 'CacheFirst',
    },
  ],
};
