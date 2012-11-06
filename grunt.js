module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'shared/*.js', 'client/*.js', 'server/*.js']
    },
    concat: {
      'shared.js':'shared/*.js',
      'client.js':'client/*.js',
      'server.js':'server/*.js'
    },
    min: {
      'shared.js':'shared/*.js',
      'client.js':'client/*.js',
      'server.js':'server/*.js'
    },    
    jshint: {
      options: {
        browser: true
      }
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  // grunt.loadNpmTasks('grunt-sample');

  // Default task.
  grunt.registerTask('default', 'lint concat');
  grunt.registerTask('dist', 'lint concat min');
};