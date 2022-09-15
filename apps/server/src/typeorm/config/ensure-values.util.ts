export function ensureObjectValues(object: object, requiredKeys: string[]): void | never {
  requiredKeys.map(key => ({ key, value: object[key] }))
    .filter(({ value }) => value === undefined)
    .forEach(({ key }) => { throw new Error(`Config error - missing process.env.${key}`) });
}
