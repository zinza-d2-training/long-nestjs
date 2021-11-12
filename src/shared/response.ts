import { IResponse } from 'src/interfaces/base';

export const response = <T>(data: T): IResponse<T> => {
  return {
    message: 'Success',
    data
  };
};
