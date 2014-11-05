var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var script = transport.script.init(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        transport: {//模块标准化组装
            options: {
                alias: '<%= pkg.spm.alias %>',
                parsers: {
                    '.js': [script.jsParser],
                    '.css': [style.css2jsParser]
                },
                paths: ['.'],
//                debug: false,
                idleading: '/modules/'

            },

            files: {
                expand: true,
                cwd: 'modules/',//限定目录
                src: [
                    "widget/**/*.js", "widget/**/*.css"
                ],
                filter: 'isFile',
                dest: '.build/modules'//处理完成后的目标目录
            }
        },

        concat: {

            ui: {
                options: {
                    include: "all",
                    alias: '<%= pkg.spm.alias %>'
                },
                files: [
                    {
                        src: ".build/**/*.js",
                        dest: "dist/md.ui.js"
                    }
                ]
            },
            css: {

                src: ['.build/**/*.css'],

                dest: 'dist/md.ui.css'

            }
        },

        uglify: {//压缩混淆
            options: {
                report: "gzip"
            },
            files: {
                cwd: 'dist/',//限定目录
                expand: true,
                src: [//处理对象
                    '**/*.js', '!**/*-debug.js'
                ],
                filter: 'isFile',//过滤（处理对象可能是文件也可能是目录）
                dest: "dist/",
                ext: '.min.js'//处理完成后的目标目录
            }
        },
        cssmin: {
            combine: {
                options: {
                    ext: '.min.css'
                },
                files: [
                    {
                        "dist/md.ui.min.css": '.build/modules/widget/**/*.css'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
//    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-img-path-replace');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['transport', "concat", "uglify", "cssmin"]);
};