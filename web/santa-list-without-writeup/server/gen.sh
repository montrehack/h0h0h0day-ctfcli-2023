PROTOC_GEN_TS_PATH="./node_modules/ts-protoc-gen/bin/protoc-gen-ts"

PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

OUT_DIR="./generated"

mkdir -p $OUT_DIR

protoc \
    --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
    --plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH} \
    --grpc_out="grpc_js:${OUT_DIR}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-node,mode=grpc-js:${OUT_DIR}" \
    --proto_path="$(pwd)" \
    schema_v1.proto
