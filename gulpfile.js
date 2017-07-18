var fs = require('fs');
var gulp = require('gulp');
var gulpTs = require('gulp-typescript');
var tsLint = require('gulp-tslint');
var tsProject = gulpTs.createProject('tsconfig.json');
var spawn = require('child_process').spawn;
var node;

function build()    {
    //Compile all ts to js
    return tsProject.src()
        .pipe(tsLint({
            formatter: "verbose",
            program: require('tslint').Linter.createProgram("./tsconfig.json"),
        }))
        .pipe(tsLint.report({
            emitError: false
        }))
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('dist'));
}

function serve()    {
    build()
        .on('end', function () {
            if(node)
                node.kill();
            node = spawn('node', ['dist/index.js'], {stdio: 'inherit'});
            node.on('close', function (code) {
                if(code === 8)  {
                    gulp.log('Node error detected... Still waiting for changes.');
                }
            });
        });
}

gulp.task('default', function ()  {
    console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Serving files and watching for changes');
    serve();
    gulp.watch('src/**', function () {
        console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Change detected, rebuilding and serving');
        serve();
    });
});

gulp.task('serve', function () {
    console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Serving files');
    serve();
});

gulp.task('build', function ()  {
    console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Building files into ./dist');
    build();
});

gulp.task('checkRepoKey', function () {
    console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Checking for repo-key and repo-key.pub');
    var repoKeyAvailable = false;
    fs.stat('repo-key', function (err, stats) {
        if(err !== null)
            repoKeyAvailable = false;
    });
    fs.stat('repo-key.pub', function (err, stats) {
        if(err !== null)
            repoKeyAvailable = false;
        else {
            fs.readFile('repo-key.pub', function (err, data) {
                console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Public key:');
                console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 ' + data);
            });
        }
    });
    if(!repoKeyAvailable) {
        console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 No repo key found! Generate a keypair using "ssh-keygen -t rsa". Don\'t set a passphrase!');
        console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Add the public key to your GitLab/Hub/Bucket account settings containing the private repo in package.json');
    }
    else {
        console.log('\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589\u2589 Repo keys found. All good');
    }
});

process.on('exit', function () {
    if(node)
        node.kill();
});