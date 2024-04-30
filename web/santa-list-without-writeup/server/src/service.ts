import {
  ServerUnaryCall,
  handleUnaryCall,
  sendUnaryData,
  status,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import {
  ListEntry,
  QueryRequest,
  QueryRequest_old,
  QueryResponse,
} from "../generated/schema_v1_pb";
import { NAUGHTY, NICE } from "./data";
import { EntryModel, db } from "./db";
import { ISantaListServer } from "../generated/schema_v1_grpc_pb";
import { logger } from "./logger";

const getEntries = db.prepare<{ type: string }>(
  `SELECT * from entries WHERE type=@type;`
);

export class SantaListServer implements ISantaListServer {
  [name: string]: UntypedHandleCall;

  getValues(
    call: ServerUnaryCall<QueryRequest, QueryResponse>,
    callback: sendUnaryData<QueryResponse>
  ) {
    try {
      const type = call.request.getType();

      logger.info(`Received call to getValues with type ${type}`);

      if (![0, 1].includes(type)) {
        return callback({
          code: status.INVALID_ARGUMENT,
          message: `Invalid type: ${type}`,
        });
      }

      const results = getEntries.iterate({
        type: type ? NICE : NAUGHTY,
      });

      const response = new QueryResponse();
      for (const row of results) {
        const dbEntry = row as EntryModel;

        const entry: ListEntry = new ListEntry();
        entry.setId(`${dbEntry.id}`);
        entry.setName(dbEntry.name);
        entry.setType(dbEntry.type);
        entry.setGift(dbEntry.gift);
        entry.setLocation(dbEntry.location);

        response.addEntries(entry);
      }

      callback(null, response);
    } catch (e) {
      callback(
        {
          code: status.INTERNAL,
          message: (e as Error).message,
          name: (e as Error).name,
        },
        null
      );
    }
  }

  getValues_old(
    call: ServerUnaryCall<QueryRequest_old, QueryResponse>,
    callback: sendUnaryData<QueryResponse>
  ) {
    try {
      const filter = call.request.getFilter();

      logger.info(`Received call to getValues_old with filter ${filter}`);

      let query = "SELECT * FROM entries";
      if (filter.length > 0) {
        query += ` WHERE ${filter}`;
      }
      const results = db.prepare(query).iterate();

      const response = new QueryResponse();
      for (const row of results) {
        const dbEntry = row as EntryModel;

        const entry: ListEntry = new ListEntry();
        entry.setId(`${dbEntry.id}`);
        entry.setName(dbEntry.name);
        entry.setType(dbEntry.type);
        entry.setGift(dbEntry.gift);
        entry.setLocation(dbEntry.location);

        response.addEntries(entry);
      }

      callback(null, response);
    } catch (e) {
      callback(
        {
          code: status.INTERNAL,
          message: (e as Error).message,
          name: (e as Error).name,
        },
        null
      );
    }
  }
}
