import { Grade } from '@prepa-sn/shared/interfaces';
import { ApiResponse } from '../../common/interfaces/api.interface';
import { API_ROUTES, AXIOS } from '../../config/api.config';

export const findAll = async (): Promise<ApiResponse<Grade[]>> => {
  return (await AXIOS.get(`${API_ROUTES.GRADES}`)).data;
};

export const findOne = async (id: string): Promise<ApiResponse<Grade>> => {
  return (await AXIOS.get(`${API_ROUTES.GRADES}/${id}`)).data;
};
