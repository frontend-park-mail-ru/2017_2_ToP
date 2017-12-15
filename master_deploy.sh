#!/bin/bash

mkdir archive

mv ./src/built archive
mv ./src/index.html archive
mv ./src/static archive

tar -czf package.tgz archive

export SSHPASS=$DEPLOY_PASS
sshpass -e scp -o StrictHostKeychecking=no package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
sshpass -e ssh -o StrictHostKeychecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && ./deploy.sh"