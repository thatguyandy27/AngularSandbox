var LIVERELOAD_PORT = 35729;
// lrSnippet is just a function.
// It's a piece of Connect middleware that injects
// a script into the static served html.
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
// All the middleware necessary to serve static files.
var livereloadMiddleware = function (connect, options) {
  return [
    // Inject a livereloading script into static files.
    lrSnippet,
    // Serve static files.
    connect.static(options.base),
    // Make empty directories browsable.
    connect.directory(options.base)
  ];
};

module.exports = function(grunt){
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                port: 9000,
                base: '.',
                middleware: livereloadMiddleware

            }
        },
        watch: {
          client: {
            // '**' is used to include all subdirectories
            // and subdirectories of subdirectories, and so on, recursively.
            files: ['*'],
            // In our case, we don't configure any additional tasks,
            // since livereload is built into the watch task,
            // and since the browser refresh is handled by the snippet.
            // Any other tasks to run (e.g. compile CoffeeScript) go here:
            tasks:[],
            options: {
              livereload:LIVERELOAD_PORT
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', []);
    grunt.registerTask('server', ['connect:server', 'watch:client'])

};