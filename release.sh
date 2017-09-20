#!/bin/bash
if [ "$1" != "prod" ] && [ "$1" != "stag" ]
then
  echo "You must specify target environment. Pass 'prod' or 'stag' as a parameter."
  exit 1
fi

ENV="$1"
CURRENT_REVISION=`git rev-parse HEAD`
CURRENT_DIR=`pwd`
TMP_DIR="/tmp/site-console-$ENV"
BRANCH="gh-pages"
REPO_URL="git@github.com:radiokit/site-console-$ENV.git"
ROLLBAR_ACCESS_TOKEN="e91425b5d11a4e419082f8fb52975bea"
LOCAL_USERNAME=`whoami`

rm -rf $TMP_DIR

echo "Releasing $CURRENT_REVISION to '$ENV' environment..."
git clone --depth=1 $REPO_URL $TMP_DIR -b $BRANCH && \
rm -rvf $TMP_DIR/* && \

cp -rv dist/shared/files/* $TMP_DIR/ && \
cp -rv dist/$ENV/files/* $TMP_DIR/ && \

npm run $ENV && \

BUNDLE_FILENAME=$(basename `find $TMP_DIR/*.bundle.js`) && \
cat dist/$ENV/templates/index.html | sed s/BUNDLE_FILENAME/$BUNDLE_FILENAME/ > $TMP_DIR/index.html && \
cp -v $TMP_DIR/index.html $TMP_DIR/404.html && \

cd $TMP_DIR && \
git add -A && \
git commit -m "Releasing revision $CURRENT_REVISION" && \
git push origin $BRANCH && \

cd $CURRENT_DIR && \

rm -rvf $TMP_DIR && \
echo -e "\n\nFinished successfully!\n"

curl https://api.rollbar.com/api/1/deploy/ \
  -F access_token=$ROLLBAR_ACCESS_TOKEN \
  -F environment=$ENV \
  -F revision=$CURRENT_REVISION \
  -F local_username=$LOCAL_USERNAME
