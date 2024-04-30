PROTOC_GEN_GRPC_PATH="./node_modules/.bin/protoc-gen-grpc-web"

OUT_DIR="src/generated"

mkdir -p $OUT_DIR

protoc --ts_out $OUT_DIR --ts_opt long_type_string --proto_path . schema_v2.proto 