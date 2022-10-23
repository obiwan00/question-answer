
export const partialToRequiredGuard = <T>(value: Partial<T>): value is Required<T> => {
  return Object.values(value).every(value => !!value);
};
