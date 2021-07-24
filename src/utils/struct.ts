import { refine, Struct } from 'superstruct';

export const nonempty = <T extends string | object | unknown[], S extends unknown>(struct: Struct<T, S>) =>
  refine<T, S>(struct, 'nonempty', (value) =>
    (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && value) || value === ''
      ? "Value can't be empty"
      : true,
  );
export function enums<T extends number>(values: readonly T[]): Struct<T, { [K in T[][number]]: K }>;
export function enums<T extends string>(values: readonly T[]): Struct<T, { [K in T[][number]]: K }>;
export function enums<T extends number | string>(values: readonly T[]): any {
  const schema: { [key: string]: any } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of values) {
    schema[key] = key;
  }

  return new Struct({
    type: 'enums',
    schema,
    validator(value) {
      return values.includes(value as any) || 'Wrong value';
    },
  });
}
