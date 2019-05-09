import { createResultDispatcher } from "./result";
import { createLookupObject } from "./lookup";
export const createDispatcher = (opts, config) => new Dispatcher(opts, config);

export interface IDispatcher {
  dispatch(obj: any);
}

export interface ILookup {
  object: any;
}

export class Dispatcher {
  dispatcher: IDispatcher;
  lookup: ILookup;

  constructor(opts = {}, config: any = {}) {
    const $createResultDispatcher =
      config.createResultDispatcher || createResultDispatcher;
    this.dispatcher = $createResultDispatcher(config);
    this.lookup = createLookupObject(opts, config);
  }

  dispatch(result) {
    this.dispatcher.dispatch(this.dispatchObjFor(result));
  }

  get lookupObj() {
    return this.lookup.object;
  }

  dispatchObjFor(result) {
    return {
      ...this.lookupObj,
      ...result
    };
  }
}
