/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as proto_user_session_pb from '../../proto/user/session_pb';


export class SessionClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_user_session_pb.LoginResponse,
    (request: proto_user_session_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    proto_user_session_pb.LoginResponse.deserializeBinary
  );

  login(
    request: proto_user_session_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_user_session_pb.LoginResponse>;

  login(
    request: proto_user_session_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: proto_user_session_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<proto_user_session_pb.LoginResponse>;

  login(
    request: proto_user_session_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: proto_user_session_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/user.Session/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/user.Session/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoLogout = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: proto_user_session_pb.LogoutRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  logout(
    request: proto_user_session_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  logout(
    request: proto_user_session_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  logout(
    request: proto_user_session_pb.LogoutRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/user.Session/Logout',
        request,
        metadata || {},
        this.methodInfoLogout,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/user.Session/Logout',
    request,
    metadata || {},
    this.methodInfoLogout);
  }

  methodInfoSignup = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: proto_user_session_pb.SignupRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  signup(
    request: proto_user_session_pb.SignupRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  signup(
    request: proto_user_session_pb.SignupRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  signup(
    request: proto_user_session_pb.SignupRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/user.Session/Signup',
        request,
        metadata || {},
        this.methodInfoSignup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/user.Session/Signup',
    request,
    metadata || {},
    this.methodInfoSignup);
  }

  methodInfoDelete = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: proto_user_session_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  delete(
    request: proto_user_session_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  delete(
    request: proto_user_session_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  delete(
    request: proto_user_session_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/user.Session/Delete',
        request,
        metadata || {},
        this.methodInfoDelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/user.Session/Delete',
    request,
    metadata || {},
    this.methodInfoDelete);
  }

}

