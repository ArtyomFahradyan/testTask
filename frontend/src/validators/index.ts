import { default as isEmailValid } from "validator/es/lib/isEmail";

export function isEmpty(value: string): boolean {
  return !value.trim();
}

export function isEmail(value: string): boolean {
  return isEmailValid(value);
}

export function isMinLength(value: string, length: number): boolean {
  return value.length >= length;
}

export function isEqual(first: string, second: string): boolean {
  return first === second;
}
