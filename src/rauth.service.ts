import * as grpcWeb from "grpc-web";
import { UserClient } from "./proto/UserServiceClientPb";
import { SignupRequest, ResetRequest, Empty } from "./proto/user_pb";
import { SessionClient } from "./proto/SessionServiceClientPb";
import { LoginRequest } from "./proto/session_pb";

enum Error {
  ERR_UNKNOWN = "E001",
  ERR_NOT_FOUND = "E002",
  ERR_NOT_AVAILABLE = "E003",
  ERR_UNAUTHORIZED = "E004",
  ERR_INVALID_TOKEN = "E005",
  ERR_INVALID_FORMAT = "E006",
  ERR_INVALID_HEADER = "E007",
  ERR_WRONG_CREDENTIALS = "E008",
  ERR_REGEX_NOT_MATCH = "E009",
}

type Metadata = { [key: string]: string };
type RpcResponseFn = (err: grpcWeb.RpcError, data: Empty) => void;
type RpcStatusFn = (status: grpcWeb.Status) => void;
type RpcMetadataFn = (status: grpcWeb.Metadata) => void;

interface ResponseHandler {
  onResponseData: (data: unknown) => void;
  onResponseStatus: (error?: Error) => void;
  onResponseMetadata: (metadata: Metadata) => void;
}

class RauthService {
  userClient: UserClient;
  sessionClient: SessionClient;
  subscribers: ResponseHandler[];

  constructor(url: string) {
    this.userClient = new UserClient(url, null, null);
    this.sessionClient = new SessionClient(url, null, null);
    this.subscribers = [];
  }

  private responseDataHandler(): RpcResponseFn {
    const subscribers = this.subscribers;
    return (_: grpcWeb.RpcError, data: Empty) => {
      subscribers.forEach((subscriber) => {
        subscriber.onResponseData(data);
      });
    };
  }

  private responseStatusHandler(): RpcStatusFn {
    const subscribers = this.subscribers;
    return (status: grpcWeb.Status) => {
      let error: Error | undefined = undefined;
      if (status.code !== grpcWeb.StatusCode.OK) {
        error = status.details as Error;
      }

      subscribers.forEach((subscriber) => {
        subscriber.onResponseStatus(error);
      });
    };
  }

  private responseMetadataHandler(): RpcMetadataFn {
    const subscribers = this.subscribers;
    return (metadata: grpcWeb.Metadata) => {
      subscribers.forEach((subscriber) => {
        subscriber.onResponseMetadata(metadata);
      });
    };
  }

  signup(email: string, password: string, headers: Metadata): void {
    const request = new SignupRequest();
    request.setEmail(email);
    request.setPwd(password);

    this.userClient
      .signup(request, headers, this.responseDataHandler())
      .on("status", this.responseStatusHandler())
      .on("metadata", this.responseMetadataHandler());
  }

  login(
    ident: string,
    password: string,
    totp: string,
    headers: Metadata
  ): void {
    const request = new LoginRequest();
    request.setIdent(ident);
    request.setPwd(password);
    request.setTotp(totp);

    this.sessionClient
      .login(request, headers, this.responseDataHandler())
      .on("status", this.responseStatusHandler())
      .on("metadata", this.responseMetadataHandler());
  }

  reset(email: string, newPwd: string, totp: string, headers: Metadata): void {
    const request = new ResetRequest();
    request.setEmail(email);
    request.setTotp(totp);
    request.setPwd(newPwd);

    this.userClient
      .reset(request, headers, this.responseDataHandler())
      .on("status", this.responseStatusHandler())
      .on("metadata", this.responseMetadataHandler());
  }

  subscribe(handler: ResponseHandler) {
    if (!this.subscribers.includes(handler)) {
      this.subscribers.push(handler);
    }
  }
}

export default RauthService;
export { ResponseHandler, Metadata, Error };
