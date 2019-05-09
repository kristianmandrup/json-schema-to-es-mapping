import { InfoHandler } from "../../info";
import { isFunction } from "../../util";

export const createResultDispatcher = config => new ResultDispatcher(config);

export class ResultDispatcher extends InfoHandler {
  onResult: (result) => void;

  constructor(config: any = {}) {
    super(config);
    this.onResult = config.onResult;
  }

  dispatch(payload) {
    if (!isFunction(this.onResult)) {
      this.info("dispatch", "missing onResult callback", {
        onResult: this.onResult
      });
      return;
    }
    this.onResult(payload);
  }
}
