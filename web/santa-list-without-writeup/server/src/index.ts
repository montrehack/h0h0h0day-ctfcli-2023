import { Server, ServerCredentials } from "@grpc/grpc-js";
import { SantaListService } from "../generated/schema_v1_grpc_pb";
import { SantaListServer } from "./service";
import { logger } from "./logger";

const SERVER_URI = "0.0.0.0:9090";

(function main() {
  const server = new Server();
  server.addService(SantaListService, new SantaListServer());
  server.bindAsync(SERVER_URI, ServerCredentials.createInsecure(), () => {
    logger.info(`Launching service at ${SERVER_URI}`);
    server.start();
  });
})();
