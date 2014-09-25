/*
 * grunt-inline-css
 * https://github.com/jgallen23/grunt-inline-css
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    inlinecss: {
      basic: {
        options: {
          extraCss: 'body { background: green; }'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      all: ['test/**/*_test.js']
    }
  });

    // Actually load this plugins task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Some tasks for running tests
  grunt.registerTask('test:specific_file', function() {
    var options = {
      'tmp/out.html': 'test/fixtures/in.html'
    };

    grunt.config('inlinecss.basic.files', options);
    grunt.task.run('inlinecss');
  });

  grunt.registerTask('test:expanded_file', function () {
    var options = 'tmp/in.html';

    grunt.config('inlinecss.basic.files', options);

    grunt.file.copy('test/fixtures/in.html', 'tmp/in.html');
    grunt.file.copy('test/fixtures/file.css', 'tmp/file.css');

    grunt.task.run('inlinecss');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
