module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {
				options: {
					basePath:'static/',
					sassDir:'sass',
					cssDir:'css',
					outputStyle:'compressed'
				}
			}
	 	},
	 	browserify: {
			dist: {
				options: {
					transform: ["jstify",'babelify']
				},
				files: {
					"./static/bundle.js": ["./app/main.js"]
				}
			},
 		},
		watch: {
			compass: {
				files: 'static/sass/*.sass', // следить за изменениями любых файлов с разширениями .scss
				tasks: ['compass'] // и запускать такую задачу при их изменении
			},
			browserify:{
				files: 'app/*.js', // следить за изменениями любых файлов с разширениями .scss
				tasks: ['browserify'] // и запускать такую задачу при их изменении
			}

		}
 
	});
 
	//погружаем все необходимые модули
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks("grunt-browserify");
 
	//забиваем в задачу по умолчению все наши задачи
	grunt.registerTask('default', ['compass', 'browserify', 'watch']);
};