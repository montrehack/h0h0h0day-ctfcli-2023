// GENERATED CODE -- DO NOT EDIT!

// package: h0h0h0
// file: schema_v1.proto

import * as schema_v1_pb from "./schema_v1_pb";
import * as grpc from "@grpc/grpc-js";

interface ISantaListService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getValues: grpc.MethodDefinition<schema_v1_pb.QueryRequest, schema_v1_pb.QueryResponse>;
  getValues_old: grpc.MethodDefinition<schema_v1_pb.QueryRequest_old, schema_v1_pb.QueryResponse>;
}

export const SantaListService: ISantaListService;

export interface ISantaListServer extends grpc.UntypedServiceImplementation {
  getValues: grpc.handleUnaryCall<schema_v1_pb.QueryRequest, schema_v1_pb.QueryResponse>;
  getValues_old: grpc.handleUnaryCall<schema_v1_pb.QueryRequest_old, schema_v1_pb.QueryResponse>;
}

export class SantaListClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getValues(argument: schema_v1_pb.QueryRequest, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
  getValues(argument: schema_v1_pb.QueryRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
  getValues(argument: schema_v1_pb.QueryRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
  getValues_old(argument: schema_v1_pb.QueryRequest_old, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
  getValues_old(argument: schema_v1_pb.QueryRequest_old, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
  getValues_old(argument: schema_v1_pb.QueryRequest_old, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<schema_v1_pb.QueryResponse>): grpc.ClientUnaryCall;
}
