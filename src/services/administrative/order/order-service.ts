import request from "supertest";
import HeaderUtils from "~/models/utils/header-utils";
require("dotenv").config();

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const administrativePathName = process.env.ADMINISTRATIVE_PATH_NAME;

export default class OrderService {
  static list = async () => {
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/orders`)
      .set(HeaderUtils.defaultHeader())
      .send();
  };
}
