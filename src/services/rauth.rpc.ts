import * as grpcWeb from "grpc-web";
import { UserClient } from "@/proto/UserServiceClientPb";
import { SignupRequest, ResetRequest, Empty } from "@/proto/user_pb";
import { SessionClient } from "@/proto/SessionServiceClientPb";
import { LoginRequest } from "@/proto/session_pb";
import config from "@/config.json";
import urlJoin from "url-join";
import Warning, { getWarning } from "@/warning";

type Token = string;
type Metadata = { [key: string]: string };

const url = urlJoin(config.RAUTH_BASE_URI, "rpc");
const userClient: UserClient = new UserClient(url, null, null);
const sessionClient: SessionClient = new SessionClient(url, null, null);

const signup = (
  email: string,
  password: string,
  headers: Metadata
): Promise<Token> => {
  return new Promise(
    (
      resolve: (value: Token | PromiseLike<Token>) => void,
      reject: (reason: Warning) => void
    ) => {
      const request = new SignupRequest();
      request.setEmail(email);
      request.setPwd(password);

      userClient
        .signup(request, headers, () => {})
        .on("status", (status: grpcWeb.Status) => {
          if (status.code !== grpcWeb.StatusCode.OK) {
            reject(getWarning(status.details));
          }
        })
        .on("metadata", (metadata: grpcWeb.Metadata) => {
          let token = metadata ? metadata[config.JWT_HEADER] : undefined;
          if (token) {
            resolve(token);
          }
        });
    }
  );
};

const login = (
  ident: string,
  password: string,
  totp: string,
  headers: Metadata
): Promise<Token> => {
  return new Promise(
    (
      resolve: (value: Token | PromiseLike<Token>) => void,
      reject: (reason: Warning) => void
    ) => {
      const request = new LoginRequest();
      request.setIdent(ident);
      request.setPwd(password);
      request.setTotp(totp);

      sessionClient
        .login(request, headers, () => {})
        .on("status", (status: grpcWeb.Status) => {
          if (status.code !== grpcWeb.StatusCode.OK) {
            reject(getWarning(status.details));
          }
        })
        .on("metadata", (metadata: grpcWeb.Metadata) => {
          let token = metadata ? metadata[config.JWT_HEADER] : undefined;
          if (token) {
            resolve(token);
          }
        });
    }
  );
};

const reset = (
  email: string,
  newPwd: string,
  totp: string,
  headers: Metadata
): Promise<void> => {
  return new Promise(
    (
      resolve: (value: void | PromiseLike<void>) => void,
      reject: (reason: Warning) => void
    ) => {
      const request = new ResetRequest();
      request.setEmail(email);
      request.setTotp(totp);
      request.setPwd(newPwd);

      userClient
        .reset(request, headers, () => {})
        .on("status", (status: grpcWeb.Status) => {
          if (status.code === grpcWeb.StatusCode.OK) resolve();
          else reject(getWarning(status.details));
        });
    }
  );
};

export default Token;
export { signup, login, reset };
