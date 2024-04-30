import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { SantaListClient } from "../generated/schema_v2.client";
import proto from "../assets/schema_v2.proto";

console.log(`[DEBUG] Loading schema_v2.proto ${proto}`);
const transport = new GrpcWebFetchTransport({
  baseUrl: "/",
  format: "binary",
});

const client = new SantaListClient(transport);

export { client, transport };
