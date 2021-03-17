const {LoginRequest, SignupRequest} = require('./proto/session_pb')
const {SessionClient} = require('./proto/session_grpc_web_pb.js')

const session_client = new SessionClient('http://127.0.0.1:5050')
//const metadata = {'Access-Control-Allow-Origin': '*'};

export function login_request(ident: string, pwd: string, app: string, callback) {
    var request = new LoginRequest();
    request.setIdent(ident)
    request.setPwd(pwd)
    request.setApp(app)

    session_client.login(request, {}, callback);
}

export function signup_request(name: string, email: string, pwd: string, callback) {
    var request = new SignupRequest();
    request.setName(name)
    request.setEmail(email)
    request.setPwd(pwd)

    session_client.signup(request, {}, callback);
}