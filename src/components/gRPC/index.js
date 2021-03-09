const {LoginRequest} = require('./proto/user/session_pb')
const {SessionClient} = require('./proto/user/session_grpc_web_pb.js')

const session_client = new SessionClient('http://127.0.0.1:5050')
//const metadata = {'Access-Control-Allow-Origin': '*'};

export function login_request(ident, pwd, app) {
    var request = new LoginRequest();
    request.setIdent(ident)
    request.setPwd(pwd)
    request.setApp(app)

    session_client.login(request, {}, async (err, response) => {
        if (err) {
            console.log(err.code);
            console.log(err.message);
        } else {
            console.log(response.getMessage());
        }
    });

    console.log("PROTO")
    console.log(request.getIdent())
}