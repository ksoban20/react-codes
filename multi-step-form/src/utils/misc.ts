interface IObject {
  [key: string]: any;
}
export const diffObject = (obj1: IObject, obj2: IObject): IObject => {
  return Object.keys(obj2).reduce((diff, key) => {
    if (obj1[key] === obj2[key]) return diff;
    return {
      ...diff,
      [key]: obj2[key],
    };
  }, {});
};

export const hasKeys = (obj: IObject): boolean => {
  return !!Object.keys(obj).length;
};

export const allExists = (...args: any[]) => {
  return args.reduce((prev, current) => {
    return prev && !!current;
  }, true);
};
