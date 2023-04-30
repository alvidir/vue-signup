import config from "@/config.json";

const queryParams: { [key: string]: string } = {};

(window.location.href.match(/\?\w.*/) ?? [""])[0]
  .match(/\w=\w*/)
  ?.forEach((param: string) => {
    const item = param.split("=");
    queryParams[item[0]] = item[1];
  });

const token = queryParams[config.TOKEN_QUERY_PARAM];
const redirect = queryParams[config.REDIRECT_QUERY_PARAM];

export { token, redirect };
