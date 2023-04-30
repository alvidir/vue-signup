const setCookie = (
  key: string,
  value: string,
  domain?: string,
  exp?: number
) => {
  let expires = "";

  if (exp) {
    const date = new Date(exp);
    expires = "; Expires=" + date.toUTCString();
  }

  domain = domain ? `; Domain=${domain}` : "";
  document.cookie = `${key}=${value || ""}${expires}${domain}; SameSite=Lax`;
};

const deleteCookie = (key: string, domain?: string) => {
  domain = domain ? `Domain=${domain}` : "";
  document.cookie = `${key}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; ${domain}; SameSite=Lax`;
};

export { setCookie, deleteCookie };
