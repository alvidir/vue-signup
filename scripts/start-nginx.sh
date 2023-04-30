#!/bin/sh

export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
export JS_TARGET=/etc/static/js/*.*.js;

for file in $JS_TARGET; do
    cat $file | envsubst $EXISTING_VARS | tee $file.out
    mv --force $file.out $file
done

cat /etc/static/index.html | envsubst $EXISTING_VARS | tee /etc/static/index.html 
nginx -g 'daemon off;'