require("dotenv").config();

export default class UtilsEnv {

  static PROFILE: string = 'PROFILE'
  static CUSTOMER_SERVICE_ADDR: string = 'CUSTOMER_SERVICE_ADDR'
  static ORDER_SERVICE_ADDR: string = 'ORDER_SERVICE_ADDR'
  static PAYMENT_SERVICE_ADDR: string = 'PAYMENT_SERVICE_ADDR'

  static CUSTOMER_VERSION: string = 'CUSTOMER_VERSION'
  static ORDER_VERSION: string = 'ORDER_VERSION'
  static PAYMENT_VERSION: string = 'PAYMENT_VERSION'

  static ADMINISTRATIVE_PATH_NAME: string = 'ADMINISTRATIVE_PATH_NAME'
  static TOTEM_PATH_NAME: string = 'TOTEM_PATH_NAME'

  static USER_IDENTIFIER: string = 'USER_IDENTIFIER'
  static TIMEOUT: string = 'TIMEOUT'

  static getEnv = (name: string, defaultValue?: string) => {
    const value = process.env[name];
    if(value) return value;
    else if(defaultValue) return defaultValue;
    throw new Error(`Environment ${name} not found`);
  };


}