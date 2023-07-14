import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    token: string
    email: string;
    password: string;
    step: any;
  }
}
