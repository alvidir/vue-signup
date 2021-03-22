import {LoginRequest, SignupRequest} from './proto/session_pb';
import { SessionClient } from './proto/session_grpc_web_pb.js';

const session_client = new SessionClient('http://127.0.0.1:5050', null, null)
//const metadata = {'Access-Control-Allow-Origin': '*'};

export function loginRequest(ident: string, pwd: string, app: string, callback: any) {
    let request = new LoginRequest();
    request.setIdent(ident)
    request.setPwd(pwd)
    request.setApp(app)

    session_client.login(request, {}, callback);
}

export function signupRequest(name: string, email: string, pwd: string, callback: any) {
    let request = new SignupRequest();
    request.setName(name)
    request.setEmail(email)
    request.setPwd(pwd)

    session_client.signup(request, {}, callback);
}