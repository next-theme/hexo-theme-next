const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');
const yaml = require('js-yaml');

gulp.task('lint', shell.task([
  'npm run eslint'
]));

gulp.task('lint:stylus', shell.task([
  'npm run stylint'
]));

gulp.task('validate:config', cb => {
  const themeConfig = fs.readFileSync(path.join(__dirname, '_config.yml'));

  try {
    yaml.safeLoad(themeConfig);
    return cb();
  } catch (error) {
    return cb(new Error(error));
  }
});

gulp.task('validate:languages', cb => {
  const languagesPath = path.join(__dirname, 'languages');
  const errors = [];

  fs.readdirSync(languagesPath).forEach(lang => {
    if (!lang.endsWith('.yml')) return;
    const languagePath = path.join(languagesPath, lang);
    try {
      yaml.safeLoad(fs.readFileSync(languagePath), {
        filename: path.relative(__dirname, languagePath)
      });
    } catch (error) {
      errors.push(error);
    }
  });

  return errors.length === 0 ? cb() : cb(errors);
});

gulp.task('default', gulp.series('lint', 'validate:config', 'validate:languages'));
