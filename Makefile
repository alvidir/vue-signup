proto_sync:
	rm -rf .tmp
	git clone https://github.com/alvidir/oauth.git .tmp
	rm -rf ./proto && cp -r .tmp/proto ./proto
	rm -rf .tmp

proto_compile:
	protoc -I=. ./proto/user/*.proto \
	--plugin ./node_modules/.bin/protoc-gen-grpc-web \
  	--js_out=import_style=commonjs,binary:./src \
  	--grpc-web_out=import_style=typescript,mode=grpcwebtext:./src

run:
	npm run serve