////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

// Gulp
const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const fs = require('fs');

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

// Add Page via Terminal
gulp.task('page', () => {
  const fileContent = '---\ntitle: Temp Title\nfescription: Temp Description\n---\n### Temp Title\nDonec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.';
  let path = process.argv[3].replace(/^-+/, "").replace(/ /g, '-');
  let file = path.substr(path.lastIndexOf('/') + 1); // find word after last /
  let dir = path.replace(file, '');
  fs.writeFileSync(`./src/${dir}${file}.md`, fileContent);
});
