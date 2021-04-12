var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    svgSprite = require('gulp-svg-sprite'),
    postcss = require('gulp-postcss'),
	postCSSImport = require( 'postcss-import' ),
    autoprefixer = require('autoprefixer'),
    concatcss = require('gulp-concat-css'),
    gulpLoadPlugins = require( 'gulp-load-plugins' ),
    plugins = gulpLoadPlugins();

gulp.task('compilehandlebar', function (cb) {
    options = {
        batch: ['handlebars']
    }

    gulp.src('index.handlebars','./*.handlebars')
        .pipe(handlebars(null, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));

    cb();
});


gulp.task('svgSprites', function (cb) {
    // Basic configuration example
    return gulp.src( './img/*.svg')
    .pipe( plugins.svgSprite( {
        shape: {
            spacing: {
                padding: 1
            },
            transform: [ 'svgo' ]
        },
        mode: {
            css: {
                layout: 'vertical',
                sprite: '../' + 'finalsprite' + '.svg',
                bust: true,
                dimensions: true,
                common: 'sprite',
                render: {
                    css: {
                        dimensions: true,
                        dest: '../' + 'sprite.css',
                        template: './sprite-template.mustache'
                    }
                }
            }
        },
        variables: {
            mapname: 'svg-sprite'
        }
    } ) )
        .pipe(gulp.dest('sprites'));

    cb();
});

gulp.task( 'postcss' , function()
{
    var plugins = [
     postCSSImport(),
     autoprefixer(),
    ];
    return gulp.src('./postcss/_*.css')
    .pipe(concatcss('style.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./sprites/css'));   
});

gulp.task('watch', function () {
    gulp.watch('img/*.svg' , gulp.parallel('svgSprites'));
    gulp.watch('handlebars/*.handlebars', gulp.parallel('compilehandlebar'));
    gulp.watch('postcss/_*.css', gulp.parallel('postcss')) 
})

gulp.task('default', gulp.series('compilehandlebar', 'svgSprites' , 'postcss', 'watch'));