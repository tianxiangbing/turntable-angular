module.exports = function(grunt){
    var config = {
        ngtemplates: {
            app: {
                cwd:'app',
                src: 'template/**.html',
                dest: 'app/dist/template/template.js',
                options: {
                    angular: 'angular',
                    module: 'myApp',
                    usemin: 'app'
                }
            }
        },
        uglify: {
            generated: {
                files: [{
                    expand: true,
                    cwd:'app',
                    src: ['dist/template/*.js'],
                    dest: "app",
                    ext: '.js'
                }]
            }
        },
        concat:{
            generated:{
                src:  ['app/dist/template/template.js' ],
                dest: 'app/dist/template/template.js'
            }
        }
    };

    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('default',['ngtemplates','uglify','concat'])
}