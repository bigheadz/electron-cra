import { getWindow } from "./index";
import { clipboard } from "electron";
var services = require("./grpc_js/text_pb");

// const PROTO_PATH = "./text.proto";
const grpc = require("@grpc/grpc-js");
// const protoLoader = require("@grpc/proto-loader");
// Suggested options for similarity to existing grpc.load behavior
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// // The protoDescriptor object has the full package hierarchy
// const textSync = protoDescriptor; // .net.wemaking.textSync;
// console.log("textSync", textSync);
export function startService() {
  const server = new grpc.Server();
  console.log("services.SyncText.services", services.SyncText.services);
  server.addService(services.SyncText, {
    SyncText,
  });
  server.bindAsync(
    "0.0.0.0:51800",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      server.start();
    }
  );

  return server;
}

function SyncText(call) {
  call.on("data", ({ id, text, action }) => {
    getWindow().webContents.send("sync", { text, action });
    if (action === "send") {
      clipboard.writeText(text);
    }
  });

  call.on("end", () => {
    console.log("end");
  });
}
