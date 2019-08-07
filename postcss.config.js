module.exports = {
  plugins: [
    require('autoprefixer')({
      // browsers: ['last 2 versions']
      overrideBrowserslist: ['ie >= 10', 'safari>=4']
    })
  ]
}
