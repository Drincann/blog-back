#!/bin/bash
dir=$(cd $(dirname $0);pwd)
ssh-keygen -m pkcs8 -t rsa -f $dir/../key/key
chmod 600 $dir/../key/*
ssh-keygen -e -m pkcs8 -f $dir/../key/key.pub > $dir/../key/key.pem