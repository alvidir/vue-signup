function signup(email: string, password: string, totp: string): string {
    console.log("Signup")
    return ""
}

function login(ident: string, password: string, totp: string): string {
    console.log("Login")
    return ""
}

function reset(current: string, newpwd: string, totp: string): string {
    console.log("Reset")
    return ""
}

export {
    signup,
    login,
    reset,
}