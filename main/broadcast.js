const os = require("os");

export default () => {
  console.log("start broadcast");
  setInterval(() => {
    sendUdp();
  }, 3000);
};

function sendUdp() {
  var dgram = require("dgram");
  var socket = dgram.createSocket("udp4");
  socket.bind(function () {
    socket.setBroadcast(true);
  });

  var message = Buffer.from(
    JSON.stringify({ name: os.hostname(), port: "60000" })
  );
  socket.send(message, 0, message.length, 61000, "255.255.255.255", function (
    err,
    bytes
  ) {
    if (err) console.error("sendError", err);
    // console.log("received", bytes && bytes.length);
    socket.close();
  });
}
