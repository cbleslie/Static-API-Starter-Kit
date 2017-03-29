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
// Tooling
////////////////////////////////////////////////////////////////////////////////

// Create a single JSON file from a single markdown file. Preserving the
// directory structure.
const createSingleResponse = (src, dist) => {
  gulp.src(src)  // Get pattern of file(s)
  .pipe(markdownToJSON(marked)) // Convert to JSON
  .pipe(gulp.dest(dist)); // Move to destination folder
};

// Create a single JSON file from many markdown files in a given soruce
// directory. Preserving the directory structure in the JSON itself.
const createConsolatedResponse = (src, dist, filename) => {
  gulp.src(src) // Get pattern of file(s)
  .pipe(gutil.buffer()) //Collect all the files in a buffer
  .pipe(markdownToJSON(marked, filename)) // Convert to JSON
  .pipe(gulp.dest(dist)); // Move to destination folder
};

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
// Building Tasks
////////////////////////////////////////////////////////////////////////////////

// Markdown to API Tasks - You edit, and make new versions of these, as you see
// fit
gulp.task('api-path', () => {
  createConsolatedResponse(path.src + '**/*.md', path.api, 'global.json');
});

gulp.task('api-individual', () => {
  createSingleResponse(path.src + '**/*.md', path.api);
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
  'api-path',
  'api-individual',
  'copyImages'
]);

// Watch
gulp.task('watch', ['build'], () => {
  gulp.watch(path.src + '**/*.md', [
    'api-path',
    'api-individual'
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
