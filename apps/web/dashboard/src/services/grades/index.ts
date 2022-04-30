import { ApiResponse } from '../../common/interfaces/api.interface';
import { Grade } from '../../common/interfaces/grade.interface';
import { API_ROUTES, AXIOS } from '../../config/api.config';

export const findAll = async (): Promise<ApiResponse<Grade[]>> => {
  const response = await AXIOS.get(`${API_ROUTES.GRADES}`);
  return response.data;
};
