import { IResponse } from 'src/interfaces/base';

export const response = (data: any): IResponse<any> => {
  return {
    message: 'Success',
    data
  };
};
