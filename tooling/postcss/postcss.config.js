module.exports = {
  plugins: [
    require('postcss-preset-env')({
      features: {
        'has-pseudo-class': true,
      },
      autoprefixer: {
        grid: true
      }
    })
  ]
};
