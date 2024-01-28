import request from "supertest";
import HeaderUtils from '~/models/utils/header-utils';
import UtilsEnv from "~/support/utils-env";

export default class OrderService {

  /**
 * Function to create a product
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createOrder = async (body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/order`)
      .set(requestHeaders)
      .send(body);
  };

  static removeOrder = async (id: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.ADMINISTRATIVE_PATH_NAME)
    return request(`${baseURL}`)
      .delete(`/${apiVersion}/${administrativePathName}/orders/${id}`)
      .set(requestHeaders)
      .send();
  };

  static updateOrder = async (id: string, body: object, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/order/${id}`)
      .set(requestHeaders)
      .send(body);
  };

  static listOrder = async (requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/order`)
      .set(requestHeaders)
      .send();
  };

  static listOrderByStatus = async (queryString: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/order?${queryString}`)
      .set(requestHeaders)
      .send();
  };

  static updateStatusOrder = async (id: string, status: string, requestHeaders: object = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.ORDER_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.ORDER_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .put(`/${apiVersion}/${administrativePathName}/order/${id}/status/${status}`)
      .set(requestHeaders)
      .send();
  };
};
