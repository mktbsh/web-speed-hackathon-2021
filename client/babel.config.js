const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: false,
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: isProduction ? false : true,
      },
    ],
  ],
};
