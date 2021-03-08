/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.user = require('./session_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.user.SessionClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.user.SessionPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.LoginRequest,
 *   !proto.user.LoginResponse>}
 */
const methodDescriptor_Session_Login = new grpc.web.MethodDescriptor(
  '/user.Session/Login',
  grpc.web.MethodType.UNARY,
  proto.user.LoginRequest,
  proto.user.LoginResponse,
  /**
   * @param {!proto.user.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LoginResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.LoginRequest,
 *   !proto.user.LoginResponse>}
 */
const methodInfo_Session_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.LoginResponse,
  /**
   * @param {!proto.user.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.user.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.SessionClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Session/Login',
      request,
      metadata || {},
      methodDescriptor_Session_Login,
      callback);
};


/**
 * @param {!proto.user.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.user.SessionPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Session/Login',
      request,
      metadata || {},
      methodDescriptor_Session_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.LogoutRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Session_Logout = new grpc.web.MethodDescriptor(
  '/user.Session/Logout',
  grpc.web.MethodType.UNARY,
  proto.user.LogoutRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.LogoutRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Session_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.user.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.SessionClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Session/Logout',
      request,
      metadata || {},
      methodDescriptor_Session_Logout,
      callback);
};


/**
 * @param {!proto.user.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.user.SessionPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Session/Logout',
      request,
      metadata || {},
      methodDescriptor_Session_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.SignupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Session_Signup = new grpc.web.MethodDescriptor(
  '/user.Session/Signup',
  grpc.web.MethodType.UNARY,
  proto.user.SignupRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.SignupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Session_Signup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.user.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.SessionClient.prototype.signup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Session/Signup',
      request,
      metadata || {},
      methodDescriptor_Session_Signup,
      callback);
};


/**
 * @param {!proto.user.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.user.SessionPromiseClient.prototype.signup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Session/Signup',
      request,
      metadata || {},
      methodDescriptor_Session_Signup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.DeleteRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Session_Delete = new grpc.web.MethodDescriptor(
  '/user.Session/Delete',
  grpc.web.MethodType.UNARY,
  proto.user.DeleteRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.DeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.DeleteRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Session_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.user.DeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.user.DeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.SessionClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Session/Delete',
      request,
      metadata || {},
      methodDescriptor_Session_Delete,
      callback);
};


/**
 * @param {!proto.user.DeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.user.SessionPromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Session/Delete',
      request,
      metadata || {},
      methodDescriptor_Session_Delete);
};


module.exports = proto.user;

