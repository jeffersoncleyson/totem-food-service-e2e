import request from "supertest";
import HeaderUtils from '~/models/utils/header-utils';
import UtilsEnv from "~/support/utils-env";

export default class PaymentService {

  /**
 * Function to create a product
 * @param {string} name
 * @param {object} requestHeaders
 * @returns 201 OK
 */
  static createPayment = async (body: object, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.PAYMENT_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.PAYMENT_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/payment`)
      .set(requestHeaders)
      .send(body);
  };

  static getPaymentById = async (id: string, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.PAYMENT_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.PAYMENT_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .get(`/${apiVersion}/${administrativePathName}/payment/${id}`)
      .set(requestHeaders)
      .send();
  };

  static callCallback = async (body: object, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.PAYMENT_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.PAYMENT_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .post(`/${apiVersion}/${administrativePathName}/payment/callback`)
      .set(requestHeaders)
      .send(body);
  };

  static cancelPayment = async (orderId: string, requestHeaders: Record<string, string> = HeaderUtils.defaultHeader() ) => {
    const baseURL = UtilsEnv.getEnv(UtilsEnv.PAYMENT_SERVICE_ADDR)
    const apiVersion = UtilsEnv.getEnv(UtilsEnv.PAYMENT_VERSION)
    const administrativePathName = UtilsEnv.getEnv(UtilsEnv.TOTEM_PATH_NAME)
    return request(`${baseURL}`)
      .patch(`/${apiVersion}/${administrativePathName}/payment/order/${orderId}/payment-cancel`)
      .set(requestHeaders)
      .send();
  };

};
