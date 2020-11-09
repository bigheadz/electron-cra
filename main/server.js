import { getWindow } from "./index";
import { clipboard } from "electron";
var services = require("./grpc_js/text_grpc_pb");

const grpc = require("@grpc/grpc-js");
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
      console.log("sync server start");
      server.start();
    }
  );

  return server;
}

function SyncText(call) {
  
  console.log("syncText start");

  call.on("data", ({ id, text, action }) => {
    console.log("SyncText.data", { id, text, action });
    getWindow().webContents.send("sync", { text, action });
    if (action === "send") {
      clipboard.writeText(text);
    }
  });

  call.on("SyncText.end", () => {
    console.log("end");
  });
}
