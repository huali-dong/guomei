let gulp = require("gulp");
let minifyJS = require("gulp-babel-minify");
let minifyCSS = require("gulp-clean-css");
let minifyImg = require("gulp-imagemin");
let connect = require("gulp-connect");
let sass = require("gulp-sass");


gulp.task("build",function(){
    /*复制html到dest*/
    gulp.src("./src/**/*.html").pipe(gulp.dest("./dest"));

    /*复制js到dest,并且将js压缩*/
    gulp.src("./src/**/*.js").pipe(minifyJS())
    .pipe(gulp.dest("./dest"));

    /*复制css到dest,并且将css压缩*/
    gulp.src("./src/**/*.css").pipe(minifyCSS())
    .pipe(gulp.dest("./dest"));

    gulp.src("./src/**/*.json").pipe(gulp.dest("./dest"));

    /*复制scss。并转换为css文件到dest*/
    gulp.src("./src/**/*.scss").pipe(sass())
    .pipe(gulp.dest("./dest"));

    gulp.src("./src/img/*/*").pipe(minifyImg())
    .pipe(gulp.dest("./dest/img"));
    
});

gulp.task("refreshHTML",function(){
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dest"))
    .pipe(connect.reload());
})
gulp.task("refreshJS",function(){
    gulp.src("./src/**/*.js").pipe(minifyJS())
    .pipe(gulp.dest("./dest"));
})
gulp.task("refreshSCSS",function(){
    gulp.src("./src/**/*.scss").pipe(sass({
        outputStyle : "expanded",
    }).on("error",sass.logError))
    .pipe(gulp.dest("./dest"));
})
gulp.task("server", function () {
    connect.server({
      root: "dest",
      port: 8080,
      livereload: true,
      middleware: function (connect, opt) {
        var Proxy = require('gulp-connect-proxy');
        opt.route = '/proxy';
        var proxy = new Proxy(opt);
        return [proxy];
      }
    });
    gulp.watch("./src/**/*.html",["refreshHTML"]);
    gulp.watch("./src/**/*.js",["refreshJS","refreshHTML"]);
    gulp.watch("./src/**/*.scss",["refreshSCSS","refreshHTML"]);
  });