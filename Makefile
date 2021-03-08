protofiles:
	rm -rf .tmp
	git clone https://github.com/alvidir/tp-auth.git .tmp
	rm -rf ./proto && cp -r .tmp/proto ./proto
	rm -rf .tmp

proto:
	protoc -I=. ./proto/user/*.proto --plugin ./node_modules/.bin/protoc-gen-grpc-web --js_out=import_style=commonjs:./src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src

run:
	npm run serve