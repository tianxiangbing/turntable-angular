module.exports = function(grunt){
    var config = {
        ngtemplates: {
            app: {
                cwd: 'app',
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
                    cwd: 'app',
                    src: ['dist/template/*.js'],
                    dest: "app",
                    ext: '.js'
                }]
            },
            libs:{
                files:[{
                    expand: true,
                    cwd: 'app',
                    src: ['components/angular/angular.min.js','components/jquery/jquery.min.js','components/dialog/dialog.js','components/jQueryRotate/jQueryRotate.js'],
                    dest: "app/dist"
                }]
            },
            app:{
                files:[{
                    expand: true,
                    cwd: 'app',
                    src: ['app.js','dist/template/template.js','directives/directives.js','services/services.js'],
                    dest: "app/dist"
                }]
            }
        },
        concat: {
            generated: {
                src: ['app/dist/template/template.js'],
                dest: 'app/dist/template/template.js'
            },
            libs:{
                src:['app/dist/components/dialog/dialog.js','app/dist/components/jQueryRotate/jQueryRotate.js'],
                dest:'app/dist/lib.js'
            },
            app:{
                src:['app/dist/app.js','app/dist/template/template.js','app/dist/directives/directives.js','app/dist/services/services.js'],
                dest:'app/dist/app.js'
            }
        },
        watch: {
            temp: {
                files: ['app/template/**.html'],
                tasks: ['ngtemplates'],
                options: {
                    livereload: true
                }
            },
            scss: {
                files: ['app/css/*.css'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/app.js', 'app/directives/*.js', 'app/services/*.js'],
                tasks: ['uglify', 'concat'],
                options: {
                    livereload: true
                }
            }
        }
    };

    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('default',['ngtemplates','uglify','concat'])
}