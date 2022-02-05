
const { src, dest, watch, parallel, series } = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const browserSync  = require('browser-sync');
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const size         = require("gulp-size");
const plumber      = require("gulp-plumber");
const notify       = require("gulp-notify");
const rename       = require("gulp-rename");
const csso         = require("gulp-csso");
const newer        = require("gulp-newer");
const webp         = require("gulp-webp");
const webpHtml     = require("gulp-webp-html");
const webpCss      = require("gulp-webp-css");
const fonter       = require("gulp-fonter");
const ttf2woff2    = require("gulp-ttf2woff2");
const concat       = require("gulp-concat");
const sourcemaps   = require("gulp-sourcemaps");




//Обработка Images
const img = () => {
  return src("app/img/**/*.{png,jpg,jpeg,svg,gif}")
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "Image",
        message: error.message
      }))
    }))
    .pipe(newer("./public/img"))
    .pipe(webp())
    .pipe(dest("./public/img"))
    .pipe(src("app/img/**/*.{png,jpg,jpeg,svg,gif}"))
    .pipe(newer("./public/img"))
    // .pipe(size({title: "До сжатия"}))
    .pipe(imagemin({
      verbose: true
    }))
    // .pipe(size({title: "После сжатия"}))
    .pipe(dest("./public/img"))
}


//Обработка Fonts
const font = () => {
  return src("app/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}")
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "Font",
        message: error.message
      }))
    }))
    .pipe(newer("./public/font"))
    .pipe(fonter({
      formats: ["ttf","woff","eot","svg"]
    }))
    .pipe(dest("./public/font"))
    .pipe(ttf2woff2())
    .pipe(dest("./public/font"))
}




const babel = require("gulp-babel");
const webpack = require("webpack-stream");

//Обработка JavaScript
const js = () => {
  return src([
      
      "node_modules/jquery/dist/jquery.js",
      "app/js/*.js"

    ])
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "JavaScript",
        message: error.message
      }))
    }))
    .pipe(babel())
    .pipe(webpack({
      mode: "development"
    }))
    .pipe(uglify())
    .pipe(rename({ suffix:".min" }))
    .pipe(dest("./public/js"), { sourcemaps: true })
}



//JS without JQuery
const jsWithout = () => {
    return src("app/js/*.js")
      .pipe(plumber({
        errorHandler: notify.onError(error => ({
          title: "JavaScript",
          message: error.message
        }))
      }))
      .pipe(babel())
      .pipe(webpack({
        mode: "development"
      }))
      .pipe(uglify())
      .pipe(rename({ suffix:".min" }))
      .pipe(dest("./public/js"), { sourcemaps: true })
  }






//Удаление директории
const clear = () => {
    return del("./public")
  }




const fileInclude = require("gulp-file-include");

//Обработка HTML
const html = () => {
  return src("app/*.html")
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(fileInclude())
    .pipe(webpHtml())

    .pipe(dest("./public"))
}




//Обработка SCSS
const scss = () => {
    return src(["app/css/*.css", "app/scss/*.scss"], { sourcemaps: true })
      .pipe(plumber({
        errorHandler: notify.onError(error => ({
          title: "SCSS",
          message: error.message
        }))
      }))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(webpCss())
      .pipe(concat('style.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
     }))
      .pipe(size( {title: "style.css"} ))
      .pipe(sourcemaps.write())
      .pipe(dest("./public/css"), { sourcemaps: true })
      .pipe(rename({ suffix:".min" }))
      .pipe(csso())
      .pipe(size( {title: "style.min.css"} ))
      .pipe(sourcemaps.write())
      .pipe(dest("./public/css"), { sourcemaps: true })
  }


//Сервер
const server = () => {
    browserSync.init({
      server: {
        baseDir: "./public"
      }
    });
  }

  
//Наблюдение за файлами
const watcher = () => {
    watch("./app/*.html", html).on("all", browserSync.reload);
    watch("./app/scss/**/*.scss", scss).on("all", browserSync.reload);
    watch("./app/js/**/*.js", js).on("all", browserSync.reload);
    watch("./app/img/**/*.{png,jpg,jpeg,svg,gif}", img).on("all", browserSync.reload);
    watch("./app/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}", font).on("all", browserSync.reload);
  }
  

exports.jsWithout = jsWithout; //Собрать файл main.js без jquery

//Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;
exports.watch = watcher;
exports.clear = clear;

//Сборка командой gulp
exports.default = series(
    parallel(html, scss, jsWithout, img),
    parallel(watcher, server)
);
