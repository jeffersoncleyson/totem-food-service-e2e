export default class HeaderUtils {

  static defaultHeader = () => {
    return {
      "content-type": "application/json"
    } as Record<string, string>;
  };
};