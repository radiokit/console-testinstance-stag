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

[ -e $TMP_DIR ] && rm -r $TMP_DIR

echo "Releasing $CURRENT_REVISION to '$1' environment..."
git clone --depth=1 $REPO_URL $TMP_DIR -b $BRANCH || (echo "Error"; exit 2)
rm -rvf $TMP_DIR/* || (echo "Error"; exit 2)

cp -rv dist/shared/files/* $TMP_DIR/ || (echo "Error"; exit 2)
cp -rv dist/$1/* $TMP_DIR/ || (echo "Error"; exit 2)

npm run $1 || (echo "Error"; exit 2)

BUNDLE_FILENAME=$(basename `find $TMP_DIR/*.bundle.js`) || (echo "Error"; exit 2)
cat dist/shared/index.html | sed 's/PLACEHOLDER_BUNDLE/$BUNDLE_FILENAME/' > $TMP_DIR/index.html || (echo "Error"; exit 2)
cp -v $TMP_DIR/index.html $TMP_DIR/404.html || (echo "Error"; exit 2)

cd $TMP_DIR || (echo "Error"; exit 2) 
git add -A || (echo "Error"; exit 2)
git commit -m "Releasing revision $CURRENT_REVISION" || (echo "Error"; exit 2)
git push origin $BRANCH || (echo "Error"; exit 2)

cd $CURRENT_DIR || (echo "Error"; exit 2)

rm -rvf $TMP_DIR || (echo "Error"; exit 2)
echo -e "\n\nFinished successfully!\n"
