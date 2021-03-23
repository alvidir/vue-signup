protofiles:
	rm -rf .tmp
	git clone https://github.com/alvidir/tp-auth.git .tmp
	rm -rf ./proto && cp -r .tmp/proto ./proto
	rm -rf .tmp

proto:
	protoc -I=. ./proto/user/*.proto --plugin ./node_modules/.bin/protoc-gen-grpc-web --js_out=import_style=commonjs:./src/services/user --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/services/user
	mv ./src/services/user/proto/user/* ./src/services/user/proto && rm -rf ./src/services/user/proto/user

proto_type:
	protoc -I=. ./proto/user/*.proto \
	--plugin ./node_modules/.bin/protoc-gen-grpc-web \
  	--js_out=import_style=commonjs,binary:./src \
  	--grpc-web_out=import_style=typescript,mode=grpcwebtext:./src
	
run:
	npm run serve