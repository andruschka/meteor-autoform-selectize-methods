Package.describe({
  name: 'andruschka:autoform-selectize-methods',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'A Meteor-Methods based Selectize for Autoform',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/andruschka/meteor-autoform-selectize-methods.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@5.0.0');
  api.addFiles(['autoform-add.js', 'afSelectizeMethods.html', 'afSelectizeMethods.js'], 'client');
});
