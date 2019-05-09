import { MappingBaseType } from "../base";
import { isStringType, isString, isNumber } from "../util";

export const short = props =>
  props.lat &&
  isNumber(props.lat.type) &&
  props.lng &&
  isNumber(props.lng.type);

export const full = props =>
  props.latitude &&
  isNumber(props.latitude.type) &&
  props.longitude &&
  isNumber(props.longitude.type);

export const hasNumericItem = (items, index) =>
  isNumber((items[index] || {}).type);

export const isPointArray = obj => {
  if (!obj) return false;
  if (obj.type !== "array") return false;
  let { items } = obj;
  return Array.isArray(items)
    ? isPointArrayItems(items)
    : isPointArrayItem(obj, items);
};

export const isPointArrayItems = (items = []) => {
  return hasNumericItem(items, 0) && hasNumericItem(items, 1);
};

export const isPointArrayItem = (obj: any = {}, items: any = {}) => {
  return isNumber(items.type) && obj.minItems == 2 && obj.maxItems == 2;
};

export const isPointType = (obj: any = {}) =>
  isString(obj.type) || isPointArray(obj);

export const isLocationKey = key => key.match(/location/);

export const isLocationKeyAndObj = (key, obj) =>
  isLocationKey(key) && isPointType(obj);

// See: https://www.elastic.co/guide/en/elasticsearch/guide/current/lat-lon-formats.html
export const isGeoPoint = (obj: any = {}, key?: string) => {
  obj = obj.value || obj;
  const isValidLocationKey = isStringType(key) && isLocationKeyAndObj(key, obj);
  if (isValidLocationKey) return true;
  const { properties } = obj;
  if (!properties) return false;
  return short(properties) || full(properties);
};

export function toGeoPoint(obj, key?: string) {
  return isGeoPoint(obj, key) && MappingGeoPoint.create(obj).convert();
}

export class MappingGeoPoint extends MappingBaseType {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return super.init();
  }

  get baseType() {
    return "geo_point";
  }

  get typeName() {
    return "geo_point";
  }

  static create(obj) {
    return new MappingGeoPoint(obj).init();
  }
}
