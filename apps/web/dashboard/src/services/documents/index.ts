import { ApiResponse } from '../../common/interfaces/api.interface';
import { Document } from '../../common/interfaces/documents.interface';
import { API_ROUTES, AXIOS } from '../../config/api.config';

export const findAll = async (): Promise<ApiResponse<Document[]>> => {
  const response = await AXIOS.get(`${API_ROUTES.DOCUMENTS}`);
  return response.data;
};
