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

type Response = {
  data?: object;
  metadata?: Metadata;
  error?: Error;
};

interface ResponseHandler {
  onResponse: (response: Response) => void;
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

  private notifySubscribers(response: Response) {
    this.subscribers.forEach((subscriber) => {
      subscriber.onResponse(response);
    });
  }

  private responseDataHandler(response: Response): RpcResponseFn {
    return (_: grpcWeb.RpcError, data: Empty) => {
      response.data = data;
    };
  }

  private responseStatusHandler(response: Response): RpcStatusFn {
    return (status: grpcWeb.Status) => {
      response.metadata = status.metadata;
      if (status.code !== grpcWeb.StatusCode.OK)
        response.error = status.details as Error;

      this.notifySubscribers(response);
    };
  }

  signup(email: string, password: string, headers: Metadata): void {
    const request = new SignupRequest();
    request.setEmail(email);
    request.setPwd(password);

    const response: Response = {};
    this.userClient
      .signup(request, headers, this.responseDataHandler(response))
      .on("status", this.responseStatusHandler(response));
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

    const response: Response = {};
    this.sessionClient
      .login(request, headers, this.responseDataHandler(response))
      .on("status", this.responseStatusHandler(response));
  }

  reset(email: string, newPwd: string, totp: string, headers: Metadata): void {
    const request = new ResetRequest();
    request.setEmail(email);
    request.setTotp(totp);
    request.setPwd(newPwd);

    const response: Response = {};
    this.userClient
      .reset(request, headers, this.responseDataHandler(response))
      .on("status", this.responseStatusHandler(response));
  }

  subscribe(handler: ResponseHandler) {
    if (!this.subscribers.includes(handler)) {
      this.subscribers.push(handler);
    }
  }
}

export default RauthService;
export { ResponseHandler, Response, Metadata, Error };
