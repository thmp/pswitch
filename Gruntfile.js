module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),
		uglify: {
			options: {
				banner: '/* (c) 2014 payworks GmbH */ \n'
			},
			dist: {
				src: 'src/jquery.pswitch.js',
				dest: 'dist/jquery.pswitch.min.js'
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'src/',
				src: ['*.css'],
				dest: 'dist/',
				ext: '.pswitch.min.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['uglify', 'cssmin']);
}