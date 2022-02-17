import * as grpcWeb from 'grpc-web';
import { UserClient } from './proto/UserServiceClientPb';
import { SignupRequest, ResetRequest, Empty } from './proto/user_pb';
import { SessionClient } from './proto/SessionServiceClientPb';
import { LoginRequest } from './proto/session_pb';

class RauthService {
    userClient: UserClient
    sessionClient: SessionClient

    constructor(url: string) {
        this.userClient = new UserClient(url, null, null);
        this.sessionClient = new SessionClient(url, null, null);
    }

    signup(email: string, password: string, headers: any): void {
        const request = new SignupRequest()
        request.setEmail(email)
        request.setPwd(password)
    
        const call = this.userClient.signup(request, headers,
        (err: grpcWeb.RpcError, response: Empty) => {
            console.log(err)
        });
        
        call.on('status', (status: grpcWeb.Status) => {
            console.log(status)
        });
    }

    login(ident: string, password: string, totp: string, headers: any): void {
        const request = new LoginRequest();
        request.setIdent(ident)
        request.setPwd(password)
        request.setTotp(totp)
    
        const call = this.sessionClient.login(request, headers,
        (err: grpcWeb.RpcError, response: Empty) => {
            console.log(err);
        });
        
        call.on('status', (status: grpcWeb.Status) => {
            console.log(status);
        });
    }

    reset(email: string, newPwd: string, totp: string, headers: any): void {
        const request = new ResetRequest();
        request.setEmail(email)
        request.setTotp(totp)
        request.setPwd(newPwd)
    
        const call = this.userClient.reset(request, headers,
        (err: grpcWeb.RpcError, response: Empty) => {
            console.log(err);
        });
        
        call.on('status', (status: grpcWeb.Status) => {
            console.log(status);
        });
    }
}

export default RauthService