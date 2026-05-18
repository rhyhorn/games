#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist/*
cp -a public/. dist/

npm run build:card_game
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:rhyhorn/games.git master:gh-pages

cd -