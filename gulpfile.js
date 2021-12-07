let project_folder = "dist";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/script/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/css/style.scss",
        js: source_folder + "/script/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,ico,gif,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/css/**/*.scss",
        js: source_folder + "/script/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,ico,gif,webp}",
    },
    clean: "./" + project_folder + "/"
}
  
let {src, dest} = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");



   
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function clean() {
    return del(path.clean)
}


function html(){
    return src(path.src.html)
            .pipe(fileinclude())
            .pipe(dest(path.build.html))
            .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
            .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
            .pipe(autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            }))
            .pipe(media())
            .pipe(dest(path.build.css))
            .pipe(clean_css())
            .pipe(rename({
                extname: ".min.css"
            }))
            .pipe(dest(path.build.css))
            .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
            .pipe(fileinclude())
            .pipe(dest(path.build.js))
            .pipe(uglify())
            .pipe(rename({
                extname: ".min.js"
            }))
            .pipe(dest(path.build.js))
            .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [
                    {
                        removeViewBox: true
                    }
                ]
            }))
            .pipe(dest(path.build.img))
            .pipe(browsersync.stream())
}

function fonts(){
    src(path.src.fonts)
            .pipe(ttf2woff())
            .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
            .pipe(ttf2woff2())
            .pipe(dest(path.build.fonts))
}
gulp.task('otf2ttf', function(){
    return src([source_folder + "/fonts/*.otf"])
            .pipe(fonter({
                formats: ['ttf']
            }))
            .pipe(dest(source_folder + "/fonts/"))
})
function WatchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
let watch = gulp.parallel(build, WatchFiles, browserSync);


exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;