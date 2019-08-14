var zll_gulp=require('gulp');
zll_gulp.task('helloworld',function(){
    console.log('hello world')
    return Promise.resolve()
})


//定义拷贝
function copyIndex(){
    return zll_gulp.src('./src/index.html').pipe(zll_gulp.dest('./dist/'))
}
zll_gulp.task('copy-index',copyIndex)

//拷贝所有html文件
function copyHtml(){
    return zll_gulp.src('./src/html/*.html').pipe(zll_gulp.dest('./dist/html'))
}
zll_gulp.task('copy-html',copyHtml)

//拷贝所有图片
function copyImgs(){
    return zll_gulp.src('./src/resource/imgs/**/*.{jpg,gif,jpeg,png}').pipe(zll_gulp.dest('./dist/resource/imgs'))
}
zll_gulp.task('copy-imgs',copyImgs)

//合并
var copyAll=zll_gulp.parallel(copyIndex,copyHtml,copyImgs)
zll_gulp.task('copy-all',copyAll)

//定义sass
//1.安装gulp-sass node-sass
//2.在文件中导入
var sass =require('gulp-sass');
function compileSass(){
   return zll_gulp.src("./src/style/**/*.scss")
    .pipe(sass({outputStyle:"expanded"}))
    .pipe(zll_gulp.dest('./dist/style'))
}
zll_gulp.task('sass',compileSass)

//定义JS
var concat=require('gulp-concat')
var uglify=require('gulp-uglify')
function cartjs(){
    return zll_gulp.src("./src/script/cart/**/*.js")
    .pipe(concat('cart.js'))
    .pipe(uglify())
    .pipe(zll_gulp.dest('./dist/script/cart'))
}
zll_gulp.task('cartjs',cartjs)

function loginjs(){
    return zll_gulp.src("./src/script/cart/**/*.js")
    .pipe(concat('loglin.js'))
    .pipe(uglify())
    .pipe(zll_gulp.dest('./dist/script/login'))
}
zll_gulp.task('loginjs',loginjs)

function lunbojs(){
    return zll_gulp.src("./src/script/lunbo/**/*.js")
    .pipe(zll_gulp.dest('./dist/script/lunbo'))
}
zll_gulp.task('lunbojs',lunbojs)

function backtopjs(){
    return zll_gulp.src("./src/script/backtop/**/*.js")
    .pipe(zll_gulp.dest('./dist/script/backtop'))
}
zll_gulp.task('backtopjs',backtopjs)


//合并js
var jsAll=zll_gulp.parallel(cartjs,loginjs,lunbojs,backtopjs)
zll_gulp.task('js-all',jsAll)

//合并所有构建任务
var build =zll_gulp.parallel(copyAll,compileSass,jsAll)
zll_gulp.task('build',build)

//生成精灵图
// var smith = require('gulp.spritesmith');
// function sprite() {
//     return zll_gulp.src('./src/resource/icons/**/*.png')
//         .pipe(smith({
//             imgName: 'sprite.png',
//             cssName: 'sprite.css'
//         }))
//         .pipe(zll_gulp.dest('./dist/resource/icons'))
// }

// zll_gulp.task('sprite', sprite);

//创建任务，监听文件改变，自动进行构建
function watch(){
    zll_gulp.watch('./src/style/**/*.scss',compileSass)
    zll_gulp.watch('./src/index.html',copyIndex)
    zll_gulp.watch('./src/html/*.html',copyHtml)
    zll_gulp.watch('./src/resource/imgs/**/*.{jpg,gif,jpeg,png}',copyImgs)
    zll_gulp.watch('./src/script/lunbo/**/*.js',lunbojs)
} 
zll_gulp.task('watch',watch)