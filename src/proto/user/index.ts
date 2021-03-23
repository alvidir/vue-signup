import {LoginRequest, SignupRequest} from './session_pb';
import { SessionClient } from './SessionServiceClientPb';

const sessionClient = new SessionClient('http://127.0.0.1:5050', null, null)
//const metadata = {'Access-Control-Allow-Origin': 'http://127.0.0.1:5050'};

export function loginRequest(ident: string, pwd: string, app: string, callback: any) {
    const request = new LoginRequest();
    request.setIdent(ident);
    request.setPwd(pwd);
    request.setApp(app);

    sessionClient.login(request, null, callback);
}

//export function signupRequest(name: string, email: string, pwd: string, callback: any) {
//    //let request = new SignupRequest();
//    //request.setName(name)
//    //request.setEmail(email)
//    //request.setPwd(pwd)
//
//    sessionClient.signup(/*request*/ null, {}, callback);
//}