// GENERATED CODE -- DO NOT EDIT!

'use strict';
var text_pb = require('./text_pb.js');

function serialize_TextSyncRequest(arg) {
  if (!(arg instanceof text_pb.TextSyncRequest)) {
    throw new Error('Expected argument of type TextSyncRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TextSyncRequest(buffer_arg) {
  return text_pb.TextSyncRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TextSyncResponse(arg) {
  if (!(arg instanceof text_pb.TextSyncResponse)) {
    throw new Error('Expected argument of type TextSyncResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TextSyncResponse(buffer_arg) {
  return text_pb.TextSyncResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义服务
var SyncTextService = exports['SyncText'] = {
  // 服务中的方法，传过来一个TextSyncRequest类型的对象，返回一个TextSyncResponse类型的对象
syncText: {
    path: '/SyncText/SyncText',
    requestStream: true,
    responseStream: true,
    requestType: text_pb.TextSyncRequest,
    responseType: text_pb.TextSyncResponse,
    requestSerialize: serialize_TextSyncRequest,
    requestDeserialize: deserialize_TextSyncRequest,
    responseSerialize: serialize_TextSyncResponse,
    responseDeserialize: deserialize_TextSyncResponse,
  },
};

