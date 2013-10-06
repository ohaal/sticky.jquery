module.exports = function (grunt) {
    grunt.initConfig({    
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.title %> <%= pkg.version %> <%=grunt.template.today("yyyy-mm-dd")%> */'
          },
          dist: {
            src: [
              'sticky.jquery.js'
            ],
            dest: 'sticky.jquery.min.js'
          },
        },
        watch: {
          scripts: {
            files: [
              'sticky.jquery.js'
            ],
            tasks: ['uglify']
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //register default task
    grunt.registerTask('default', 'watch');
}