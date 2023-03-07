import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';


const SRC_FOLDER = './client';
const BUILD_FOLDER = './build';
const HTML = SRC_FOLDER + '/index.html';
const IMG_PATH = SRC_FOLDER + '/images/**/*.*';
const JS_FILES_PATH = SRC_FOLDER + '/js/';
const SCSS_FILES_PATH = SRC_FOLDER + '/css/**/*.css';

async function jsCompilation() {
  gulp.src([
    JS_FILES_PATH + 'urls.js',
    JS_FILES_PATH + 'client.js', JS_FILES_PATH + 'main_app.js',
    JS_FILES_PATH + 'modal.js', JS_FILES_PATH + 'slider.js',
    JS_FILES_PATH + 'helpers.js', JS_FILES_PATH + 'productPage.js',
    JS_FILES_PATH + 'salesPage.js', JS_FILES_PATH + 'allProducts.js',
    JS_FILES_PATH + 'category_menu.js', JS_FILES_PATH + 'shoppingCart.js',
    JS_FILES_PATH + 'personal_account.js', JS_FILES_PATH + 'validate.js',
    JS_FILES_PATH + 'userInfo.js',
  ])
    .pipe(uglify())
    .pipe(concat('result.js'))
    .pipe(gulp.dest(BUILD_FOLDER + '/js'));
  }
  
  async function cssCompilation() {
    gulp.src(SCSS_FILES_PATH)
    .pipe(concat('main.css'))
    .pipe(gulp.dest(BUILD_FOLDER + '/css'));
  }

  async function compilationHTML() {
    gulp.src(HTML)
    .pipe(htmlmin({ collapseWhitespace : true }))
    .pipe(gulp.dest(BUILD_FOLDER))
}
async function compilationIMG() {
  gulp.src(IMG_PATH)
  .pipe(imagemin())
  .pipe(gulp.dest(BUILD_FOLDER + '/images'))
}
  gulp.task('html-compile', compilationHTML);

  gulp.task('img-compile', compilationIMG);

  gulp.task('css-compile', cssCompilation);
  
  gulp.task('js-compile', jsCompilation);

  gulp.task('watch-html', function() {
    gulp.watch(HTML, compilationHTML)
  })

  gulp.task('watch-css', function() {
    gulp.watch(SCSS_FILES_PATH, cssCompilation)
  })
  
  gulp.task('watch-js', function() {
    gulp.watch(JS_FILES_PATH, jsCompilation)
  })

  gulp.task('wath-img', function() {
    gulp.watch(IMG_PATH, compilationIMG)
  })

  gulp.task('watch', gulp.parallel(
    'watch-css',
    'watch-js',
    'watch-html',
    'img-compile'
  ));
  
  gulp.task('default', gulp.parallel('js-compile', 'css-compile', 'html-compile', 'img-compile'));