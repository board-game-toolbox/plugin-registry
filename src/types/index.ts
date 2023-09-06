export interface Res<T = void> {
  code: number;
  msg?: string;
  data?: T;
}
