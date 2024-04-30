// package: h0h0h0
// file: schema_v1.proto

import * as jspb from "google-protobuf";

export class ListEntry extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getGift(): string;
  setGift(value: string): void;

  getLocation(): string;
  setLocation(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ListEntry): ListEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListEntry;
  static deserializeBinaryFromReader(message: ListEntry, reader: jspb.BinaryReader): ListEntry;
}

export namespace ListEntry {
  export type AsObject = {
    id: string,
    name: string,
    type: string,
    gift: string,
    location: string,
  }
}

export class QueryResponse extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<ListEntry>;
  setEntriesList(value: Array<ListEntry>): void;
  addEntries(value?: ListEntry, index?: number): ListEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryResponse): QueryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryResponse;
  static deserializeBinaryFromReader(message: QueryResponse, reader: jspb.BinaryReader): QueryResponse;
}

export namespace QueryResponse {
  export type AsObject = {
    entriesList: Array<ListEntry.AsObject>,
  }
}

export class QueryRequest extends jspb.Message {
  getType(): EntryTypeMap[keyof EntryTypeMap];
  setType(value: EntryTypeMap[keyof EntryTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryRequest): QueryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryRequest;
  static deserializeBinaryFromReader(message: QueryRequest, reader: jspb.BinaryReader): QueryRequest;
}

export namespace QueryRequest {
  export type AsObject = {
    type: EntryTypeMap[keyof EntryTypeMap],
  }
}

export class QueryRequest_old extends jspb.Message {
  getFilter(): string;
  setFilter(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryRequest_old.AsObject;
  static toObject(includeInstance: boolean, msg: QueryRequest_old): QueryRequest_old.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryRequest_old, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryRequest_old;
  static deserializeBinaryFromReader(message: QueryRequest_old, reader: jspb.BinaryReader): QueryRequest_old;
}

export namespace QueryRequest_old {
  export type AsObject = {
    filter: string,
  }
}

export interface EntryTypeMap {
  NAUGHTY: 0;
  NICE: 1;
}

export const EntryType: EntryTypeMap;

