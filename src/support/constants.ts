import { IDefineStepOptions } from "@cucumber/cucumber/lib/support_code_library_builder/types"
import UtilsEnv from "./utils-env"

export const DEFAULT_TIMEOUT: string = String(2 * 5000)
export const BASE_STEP_DEFINITION_OPTIONS: IDefineStepOptions = {
  timeout: parseInt(UtilsEnv.getEnv(UtilsEnv.TIMEOUT, DEFAULT_TIMEOUT))
}

export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}