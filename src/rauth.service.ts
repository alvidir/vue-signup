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

interface ResponseHandler {
  onResponseError: (code: Error) => void;
  onResponseSuccess(response: any): void;
  onResponseMetadata: (metadata: any) => void;
}

class RauthService {
  userClient: UserClient;
  sessionClient: SessionClient;
  handler: ResponseHandler;

  constructor(url: string, handler: ResponseHandler) {
    this.userClient = new UserClient(url, null, null);
    this.sessionClient = new SessionClient(url, null, null);
    this.handler = handler;

    this.handleResponse = this.handleResponse.bind(this);
    this.handleResponseStatus = this.handleResponseStatus.bind(this);
    this.handleResponseMetadata = this.handleResponseMetadata.bind(this);
  }

  private handleResponse = (
    grpcError: grpcWeb.RpcError,
    response: Empty
  ): void => {
    if (!grpcError) this.handler.onResponseSuccess(response);
  };

  private handleResponseStatus = (status: grpcWeb.Status) => {
    if (status.code !== grpcWeb.StatusCode.OK)
      this.handler.onResponseError(status.details as Error);
  };

  private handleResponseMetadata = (metadata: grpcWeb.Metadata) => {
    if (metadata) this.handler.onResponseMetadata(metadata);
  };

  signup(email: string, password: string, headers: any): void {
    const request = new SignupRequest();
    request.setEmail(email);
    request.setPwd(password);

    const call = this.userClient.signup(request, headers, this.handleResponse);
    call.on("status", this.handleResponseStatus);
    call.on("metadata", this.handleResponseMetadata);
  }

  login(ident: string, password: string, totp: string, headers: any): void {
    const request = new LoginRequest();
    request.setIdent(ident);
    request.setPwd(password);
    request.setTotp(totp);

    const call = this.sessionClient.login(
      request,
      headers,
      this.handleResponse
    );
    call.on("status", this.handleResponseStatus);
    call.on("metadata", this.handleResponseMetadata);
  }

  reset(email: string, newPwd: string, totp: string, headers: any): void {
    const request = new ResetRequest();
    request.setEmail(email);
    request.setTotp(totp);
    request.setPwd(newPwd);

    const call = this.userClient.reset(request, headers, this.handleResponse);
    call.on("status", this.handleResponseStatus);
    call.on("metadata", this.handleResponseMetadata);
  }
}

export default RauthService;
export { ResponseHandler, Error };
