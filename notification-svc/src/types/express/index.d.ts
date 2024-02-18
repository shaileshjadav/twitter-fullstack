// export * from './express';
// to make the file a module and avoid the TypeScript error
// export {};

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
