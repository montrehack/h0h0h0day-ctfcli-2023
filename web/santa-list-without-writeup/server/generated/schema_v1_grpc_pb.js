// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var schema_v1_pb = require('./schema_v1_pb.js');

function serialize_h0h0h0_QueryRequest(arg) {
  if (!(arg instanceof schema_v1_pb.QueryRequest)) {
    throw new Error('Expected argument of type h0h0h0.QueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_h0h0h0_QueryRequest(buffer_arg) {
  return schema_v1_pb.QueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_h0h0h0_QueryRequest_old(arg) {
  if (!(arg instanceof schema_v1_pb.QueryRequest_old)) {
    throw new Error('Expected argument of type h0h0h0.QueryRequest_old');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_h0h0h0_QueryRequest_old(buffer_arg) {
  return schema_v1_pb.QueryRequest_old.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_h0h0h0_QueryResponse(arg) {
  if (!(arg instanceof schema_v1_pb.QueryResponse)) {
    throw new Error('Expected argument of type h0h0h0.QueryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_h0h0h0_QueryResponse(buffer_arg) {
  return schema_v1_pb.QueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SantaListService = exports.SantaListService = {
  getValues: {
    path: '/h0h0h0.SantaList/GetValues',
    requestStream: false,
    responseStream: false,
    requestType: schema_v1_pb.QueryRequest,
    responseType: schema_v1_pb.QueryResponse,
    requestSerialize: serialize_h0h0h0_QueryRequest,
    requestDeserialize: deserialize_h0h0h0_QueryRequest,
    responseSerialize: serialize_h0h0h0_QueryResponse,
    responseDeserialize: deserialize_h0h0h0_QueryResponse,
  },
  getValues_old: {
    path: '/h0h0h0.SantaList/GetValues_old',
    requestStream: false,
    responseStream: false,
    requestType: schema_v1_pb.QueryRequest_old,
    responseType: schema_v1_pb.QueryResponse,
    requestSerialize: serialize_h0h0h0_QueryRequest_old,
    requestDeserialize: deserialize_h0h0h0_QueryRequest_old,
    responseSerialize: serialize_h0h0h0_QueryResponse,
    responseDeserialize: deserialize_h0h0h0_QueryResponse,
  },
};

exports.SantaListClient = grpc.makeGenericClientConstructor(SantaListService);
