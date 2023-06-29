import request from "supertest";
import { StatusOrder } from "~/models/totem/totem-model";
import HeaderUtils from "~/models/utils/header-utils";
require("dotenv").config();

const baseURL = process.env.BASE_URL;
const apiVersion = process.env.VERSION_1;
const totemPathName = process.env.TOTEM_PATH_NAME;

export default class OrderService {
  /**
   * Function to create a Order
   * @param {string} curtomerId
   * @param {Array} combo
   * @param {Array} product
   * @returns 201 OK
   */
  static createOrder = async (body: object) => {
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${totemPathName}/order`)
      .set(HeaderUtils.defaultHeader())
      .send(body);
  };

  static updateOrder = async (id: string, body: object) => {
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${totemPathName}/order/${id}`)
      .set(HeaderUtils.defaultHeader())
      .send(body);
  };

  static updateStatusOrder = async (id: string, status: StatusOrder) => {
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${totemPathName}/order/${id}/status/${status}`)
      .set(HeaderUtils.defaultHeader());
  };
}
