function setCookie(key: string, value: string, domain?: string, exp?: number) {
  let expires = "";

  if (exp) {
    const date = new Date(exp);
    expires = "; Expires=" + date.toUTCString();
  }

  domain = domain ? `; Domain=${domain}` : "";
  document.cookie = `${key}=${value || ""}${expires}${domain}; SameSite=Lax`;
}

export { setCookie };
