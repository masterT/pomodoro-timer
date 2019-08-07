#!/usr/bin/env sh

# Abort on errors.
set -e

# Build application.
npm run build

# Navigate into the build output directory.
cd dist

git init
git add -A
git commit -m 'Deploy.'

# Push code.
# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:masterT/pomodoro-timer.git master:gh-pages

cd -