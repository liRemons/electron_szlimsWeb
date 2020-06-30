import Cookies from "js-cookie";
import { remote } from "electron";
const TokenKey = "szlims";

export function getToken() {
  return remote.getGlobal("shareObject").token;
}

export function setToken(token) {
  return (remote.getGlobal("shareObject").token = JSON.stringify(token));
}

export function removeToken() {
  return (remote.getGlobal("shareObject").token = {});
}

