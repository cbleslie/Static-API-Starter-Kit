////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

// Gulp
const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');

// Markdown & JSON
const marked = require('marked');
const markdownToJSON = require('gulp-markdown-to-json');

////////////////////////////////////////////////////////////////////////////////
// Project Settings
////////////////////////////////////////////////////////////////////////////////

// Paths
const path = {
  api: './api/',
  src: './src/'
};

// Markdown Options
marked.setOptions({
  pedantic: true,
  smartypants: true
});

////////////////////////////////////////////////////////////////////////////////
// Tooling
////////////////////////////////////////////////////////////////////////////////
const createAPIResponse = src => (dist, filename) => {
  gulp.src(src)
  .pipe(filename ? gutil.buffer() : gutil.noop())
  .pipe(markdownToJSON(marked, filename ? filename : false))
  .pipe(gulp.dest(dist));
};

const createRootAPI = createAPIResponse(path.src + '**/*.md');


////////////////////////////////////////////////////////////////////////////////
// Building Tasks
////////////////////////////////////////////////////////////////////////////////

// Markdown to API Tasks - You edit, and make new versions of these, as you see
// fit
gulp.task('api', () => {
  createRootAPI(path.api, 'global.json');
  createRootAPI(path.api);
});

// Image Tasks
gulp.task('copyImages', () => {
  gulp.src(path.src + '**/*.{jpg, png, gif, tif, svg}')
  .pipe(gulp.dest(path.api));
});

//Cleaning Tasks
gulp.task('clean', () => {
  return gulp.src(path.api, {read: false})
         .pipe(clean());
});

////////////////////////////////////////////////////////////////////////////////
// Meta Tasks
////////////////////////////////////////////////////////////////////////////////

// Build
gulp.task('build', [
  'clean',
  'api',
  'copyImages'
]);

// Watch
gulp.task('watch', ['build'], () => {
  gulp.watch(path.src + '**/*.md', [
    'api-path',
  ]);
  gulp.watch(path.src + '**/*.{jpg, png, gif, tif, svg}', [
    'copyImages'
  ]);
});

// Default
gulp.task('default', () => {
  console.log(
    `
    Avaliable Gulp Tasks
    --------------------
    - Build: gulp build
    - Watch: gulp watch
`
  );
});
