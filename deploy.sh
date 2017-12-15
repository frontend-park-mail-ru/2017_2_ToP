#!/bin/sh

eval "$(ssh-agent -s)"
ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts
chmod 600 $HOME/.ssh/server
ssh-add $HOME/.ssh/server

ssh $DEPLOY_USER@$DEPLOY_HOST "rm -rf $DIST_PATH/*"

scp -r $DEPLOY_PATH/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

echo "Restarting..."
ssh -p $PORT td@$SERVER_IP "supervisorctl restart td"