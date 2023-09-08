export interface Res<T = void> {
  code: number;
  msg?: string;
  data?: T;
}

export class SpecialError extends Error {
  code = 0;
  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}
