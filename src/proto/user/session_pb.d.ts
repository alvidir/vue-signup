import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class SignupRequest extends jspb.Message {
  getName(): string;
  setName(value: string): SignupRequest;

  getEmail(): string;
  setEmail(value: string): SignupRequest;

  getPwd(): string;
  setPwd(value: string): SignupRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignupRequest): SignupRequest.AsObject;
  static serializeBinaryToWriter(message: SignupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignupRequest;
  static deserializeBinaryFromReader(message: SignupRequest, reader: jspb.BinaryReader): SignupRequest;
}

export namespace SignupRequest {
  export type AsObject = {
    name: string,
    email: string,
    pwd: string,
  }
}

export class LoginRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): LoginRequest;

  getIdent(): string;
  setIdent(value: string): LoginRequest;

  getPwd(): string;
  setPwd(value: string): LoginRequest;

  getApp(): string;
  setApp(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    token: string,
    ident: string,
    pwd: string,
    app: string,
  }
}

export class LoginResponse extends jspb.Message {
  getCookie(): string;
  setCookie(value: string): LoginResponse;

  getStatus(): Status;
  setStatus(value: Status): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    cookie: string,
    status: Status,
  }
}

export class LogoutRequest extends jspb.Message {
  getCookie(): string;
  setCookie(value: string): LogoutRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogoutRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LogoutRequest): LogoutRequest.AsObject;
  static serializeBinaryToWriter(message: LogoutRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogoutRequest;
  static deserializeBinaryFromReader(message: LogoutRequest, reader: jspb.BinaryReader): LogoutRequest;
}

export namespace LogoutRequest {
  export type AsObject = {
    cookie: string,
  }
}

export class DeleteRequest extends jspb.Message {
  getIdent(): string;
  setIdent(value: string): DeleteRequest;

  getPwd(): string;
  setPwd(value: string): DeleteRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequest;
  static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
  export type AsObject = {
    ident: string,
    pwd: string,
  }
}

export enum Status { 
  ALIVE = 0,
  DEAD = 1,
  NEW = 2,
}
