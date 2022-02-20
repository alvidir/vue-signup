import * as grpcWeb from 'grpc-web';
import { UserClient } from './proto/UserServiceClientPb';
import { SignupRequest, ResetRequest, Empty } from './proto/user_pb';
import { SessionClient } from './proto/SessionServiceClientPb';
import { LoginRequest } from './proto/session_pb';

enum Error {
    ERR_UNKNOWN = "E-001",
    ERR_NOT_FOUND = "E-002",
    ERR_NOT_AVAILABLE = "E-003",
    ERR_UNAUTHORIZED = "E-004",
    ERR_INVALID_TOKEN = "E-005",
    ERR_INVALID_FORMAT = "E-006",
    ERR_INVALID_HEADER = "E-007",
    ERR_WRONG_CREDENTIALS = "E-008",
    ERR_REGEX_NOT_MATCH = "E-009",
}

interface ResponseHandler {
    onResponseError: (code: Error) => void,
    onResponseSuccess: (response: any) => void,
}

class RauthService {
    userClient: UserClient
    sessionClient: SessionClient
    handler: ResponseHandler

    constructor(url: string, handler: ResponseHandler) {
        this.userClient = new UserClient(url, null, null)
        this.sessionClient = new SessionClient(url, null, null)
        this.handler = handler

        this.retrieveResponse = this.retrieveResponse.bind(this)
    }

    private retrieveResponse = (err: grpcWeb.RpcError, response: Empty): void => {
        console.log("MESSAGE >>>>>>>>>>>>>> ", response)
        const errorCode: string = err.message.toString()
        console.log("ERROR >>>>>>>>>>>>>>>> ", errorCode as Error)
        if (err) this.handler.onResponseError(errorCode as Error)
        else this.handler.onResponseSuccess(response)
    }

    signup(email: string, password: string, headers: any): void {
        const request = new SignupRequest()
        request.setEmail(email)
        request.setPwd(password)
    
        const call = this.userClient.signup(request, headers, this.retrieveResponse);
    }

    login(ident: string, password: string, totp: string, headers: any): void {
        const request = new LoginRequest();
        request.setIdent(ident)
        request.setPwd(password)
        request.setTotp(totp)
    
        const call = this.sessionClient.login(request, headers, this.retrieveResponse);
    }

    reset(email: string, newPwd: string, totp: string, headers: any): void {
        const request = new ResetRequest();
        request.setEmail(email)
        request.setTotp(totp)
        request.setPwd(newPwd)
    
        const call = this.userClient.reset(request, headers, this.retrieveResponse);
    }

    
}

export default RauthService
export {
    ResponseHandler,
    Error,
}