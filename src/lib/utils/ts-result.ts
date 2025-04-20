type ResultSuccess<T> = {
  status: 'success';
  data: T;
};
type ResultError = {
  status: 'error';
  message: string;
};

/** The generic you pass will be the data prop of success */
export type Result<T> = ResultSuccess<T> | ResultError;
