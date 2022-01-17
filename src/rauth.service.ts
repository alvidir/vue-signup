import * as grpcWeb from 'grpc-web';
import { UserServiceClient } from '@/proto/UserServiceClientPb';
import { SignupRequest, Empty } from '@/proto/user_pb';

const addr = "localhost:8080";

function signup(email: string, password: string, totp: string): void {
    const userService = new UserServiceClient('http://localhost:8080', null, null);
    const request = new SignupRequest();
    request.setEmail(email);
    request.setPwd(password);

    const call = userService.signup(request, {'custom-header-1': 'value1'},
    (err: grpcWeb.RpcError, response: Empty) => {
        console.log("OK");
    });
    call.on('status', (status: grpcWeb.Status) => {
        console.log(status);
    });
}

function login(ident: string, password: string, totp: string): void {
    console.log("Login")
}

function reset(current: string, newpwd: string, totp: string): void {
    console.log("Reset")
}

export {
    signup,
    login,
    reset,
}