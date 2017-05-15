module.exports = {
  staticFileGlobs: [
    'docs/index.html',
    'docs/dist/images/**.*',
    'docs/dist/fonts/**.*',
    'docs/html/**/*.html',
    'docs/*.html',
    'docs/dist/css/all.min.css',
    'docs/dist/js/dependencies.min.js',
    'docs/dist/js/scripts.min.js',
  ],
  verbose: true,
  stripPrefix: 'docs/',
  runtimeCaching: [{
    urlPattern: /\api\.spotify\.com\//,
    handler: 'fastest',
    options: {
      cache: {
        name: 'api-cache'
      }
    }
  }]
};
