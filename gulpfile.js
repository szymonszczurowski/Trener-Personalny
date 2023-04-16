const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

const rename = require('gulp-rename')

const babel = require('gulp-babel')

const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');

const kit = require('gulp-kit');

const clean = require('gulp-clean');

const browserSync = require('browser-sync').create();
// const reload = browserSync.reload;

const paths = {
    indexHTML: './dist/*.html',
    html: './src/html/**/*.kit',
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    img: './src/img/**/*',
    dist: './dist',
    sassDest: './dist/css',
    jsDest: './dist/js',
    imgDest: './dist/img'
}


function sassCompailer(done) {
	src(paths.sass)
		.pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init()) // inicjacja source
		.pipe(autoprefixer()) // dodanie prefixów
		.pipe(cssnano()) // minifikacja kodu
		.pipe(rename({ suffix: '.min' })) // doanie suffixu .min (minifikacja)
        .pipe(sourcemaps.write()) // zapisanie source
		.pipe(dest(paths.sassDest))
	done()
}

function javaScript(done) {
	src(paths.js)
		.pipe(babel({ presets: ['@babel/env'], })) // env czyli js
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))
	done()
}

function convertImage(done){
    src(paths.img)
        .pipe(imagemin())
        .pipe(dest(paths.imgDest))
    done()
}

function handleKits(done){
    src(paths.html)
        .pipe(kit())
        .pipe(dest('./dist'))
    done()
}

function cleanStuff(done){
    src(paths.dist, {read: false}) // można ustawić też np tylko img itp.
        .pipe(clean());
    done()
}

function startBrowserSync(done){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done()
}

    // śledzenie wszystkich zmian w html, sass, js, img
function watchForChanges(done){
    watch(paths.indexHTML).on("change", browserSync.reload); 
    watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompailer, javaScript)).on("change", browserSync.reload); 
    watch(paths.img, convertImage).on("change", browserSync.reload); 
    done()
}

const mainFunctions = parallel(handleKits, sassCompailer, javaScript, convertImage)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)


// exports.sassCompailer = sassCompailer

// ** - czyli przeszukanie podfolderów, * - wszyskie pliki z rozszerzeniem scss

// .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) - To np. zamiast cssnano

// (minifikacja, zeby było widać, ze styl sie z minifikowany)
