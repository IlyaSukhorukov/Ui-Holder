import 'reflect-metadata';
/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export declare class Serializable {
  /**
   * Deserialize object from static method.
   *
   * Example:
   * const obj: MyObject = MyObject.fromJSON({...data});
   *
   * @static
   * @param {object} json
   * @returns {object}
   * @memberof Serializable
   */
  static fromJSON<T extends Serializable>(this: new () => T, json: object): T;
  static fromJSONCollection<T extends Serializable>(this: new () => T, jsonArray: object[]): T[];
  /**
   * Fill property of current model by data from json.
   *
   * Example:
   * const obj: MyObject = new MyObject().fromJSON({...data});
   *
   * @param {object} ujson
   * @returns {this}
   * @memberof Serializable
   */
  fromJSON(json: object): this;
  /**
   * Process serelization for @jsonIgnore decorator
   *
   * @returns {object}
   * @memberof Serializable
   */
  toJSON(): object;
  /**
   * Process exceptions from wrong types.
   * By default just print warning in console, but can by override for drop exception or logging to backend.
   *
   * @protected
   * @param {string} prop
   * @param {string} message
   * @param {(unknown)} jsonValue
   * @memberof Serializable
   */
  protected onWrongType(prop: string, message: string, jsonValue: unknown): void;
  private serializeProperty;
  /**
   * //todo: write jsdoc
   *
   * @private
   * @param {object} object
   * @param {string} prop
   * @param {AcceptedTypes[]} acceptedTypes
   * @param {(unknown)} jsonValue
   * @returns {(Object | null | void)}
   * @memberof Serializable
   */
  private deserializeProperty;
  /**
   * Clone current object.
   *
   * Example:
   * const obj: MyObject = MyObject.fromJSON({...data});
   * const clone: MyObject = obj.clone();
   *
   * @returns {object}
   * @memberof Serializable
   */
  clone<T extends Serializable>(): T;
}

export declare type AcceptedType = null | void | BooleanConstructor | NumberConstructor | StringConstructor | ObjectConstructor | (new (...args: (Object | null | void)[]) => object) | DateConstructor | SymbolConstructor | MapConstructor;
declare type IRecursiveArray<T> = (T | IRecursiveArray<T>)[];
export declare type AcceptedTypes = AcceptedType | IRecursiveArray<AcceptedType>;
export {};

export declare function jsonProperty(...args: AcceptedTypes[]): PropertyDecorator;
