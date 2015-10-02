#!/bin/bash
if [ "$1" != "prod" ] && [ "$1" != "stag" ]
then
  echo "You must specify target environment. Pass 'prod' or 'stag' as a parameter."
  exit 1
fi

CURRENT_REVISION=`git rev-parse HEAD`
CURRENT_DIR=`pwd`
TMP_DIR="/tmp/site-console-$1"
BRANCH="gh-pages"
REPO_URL="git@github.com:radiokit/site-console-$1.git"

echo "Releasing $CURRENT_REVISION to '$1' environment..."
git clone --depth=1 $REPO_URL $TMP_DIR -b $BRANCH && rm -rvf $TMP_DIR/* && cp -rv dist/shared/* $TMP_DIR/ && cp -rv dist/$1/* $TMP_DIR/ && npm run $1 && cd $TMP_DIR && git add -A && git commit -m "Releasing revision $CURRENT_REVISION" && git push origin $BRANCH && cd $CURRENT_DIR && rm -rvf $TMP_DIR && "Finished successfully"
