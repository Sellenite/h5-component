var gulp = require('gulp')
var rev = require('gulp-rev')  // 添加版本号，哈希码
var revReplace = require('gulp-rev-replace')  // 更新index.html的引用
var useref = require('gulp-useref')  // 合并配置 
var filter = require('gulp-filter')  // 筛选文件
var uglify = require('gulp-uglify') // js压缩
var csso = require('gulp-csso') // css压缩

gulp.task('default', function () {
    var jsFilter = filter('**/*.js', { restore: true })
    var cssFilter = filter('**/*.css', { restore: true })
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true })

    return gulp.src('index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
})