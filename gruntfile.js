module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    clean: ['./dist'],
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./src/documentation/public",
            src: ["**"],
            dest: "./dist/documentation/public"
          },
          {
            expand: true,
            cwd: "./src/express/views",
            src: ["**"],
            dest: "./dist/express/views"
          },
          {
            expand: true,
            cwd: "./src/test",
            src: ["*.opts"],
            dest: "./dist/test"
          }
        ]
      }
    },
    express: {
      dev: {
        options: {
          script: "dist/index.js"
        }
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: true,
          rootDir: "src"
        }
      }
    },
    watch: {
      copy: {
        files: ["src/\*\*/\*.ts"],
        tasks:  ["copy"]
      },
      express: {
        files:  ["src/\*\*/\*.ts"],
        tasks:  ["express:dev"],
        options: {
          spawn: false
        }
      },
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "clean",
    "copy",
    "ts"
  ]);

  grunt.registerTask("serve", [
    "clean",
    "copy",
    "ts",
    "express:dev",
    "watch"
  ]);
};