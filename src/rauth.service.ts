import * as grpcWeb from 'grpc-web';
import { UserClient } from '@/proto/UserServiceClientPb';
import { SignupRequest, Empty, DeleteRequest } from '@/proto/user_pb';
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

    delete(password: string, totp: string,  headers: any): void {
        const request = new DeleteRequest()
        request.setPwd(password)
        request.setTotp(totp)
    
        const call = this.userClient.delete(request, headers,
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

    logout(headers: any): void {
        const request = new Empty()
        const call = this.sessionClient.logout(request, headers,
        (err: grpcWeb.RpcError, response: Empty) => {
            console.log(err);
        });
        
        call.on('status', (status: grpcWeb.Status) => {
            console.log(status);
        });
    }
}

export default RauthService