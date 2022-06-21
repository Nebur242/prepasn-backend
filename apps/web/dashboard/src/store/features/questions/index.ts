import { Status } from '@prepa-sn/shared/enums';
import { Question } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface QuestionsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  questions: Question[];
}

const initialState: QuestionsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  questions: [],
};

const BASE_PATH = `/questions` as const;
const TAG_TYPE = `Questions` as const;
const NAME = 'questions' as const;

export const exercisesApi = createApi({
  reducerPath: `${NAME}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneQuestion: build.query<Question, string>({
      query: (id: string) => ({ url: `${BASE_PATH}/${id}`, method: 'GET' }),
    }),
    findAllQuestions: build.query<Pagination<Question>, IPaginationOptions>({
      query: (
        pagination: IPaginationOptions = {
          page: 1,
          limit: 10,
        }
      ) => {
        const { page, limit } = pagination;
        const params = new URLSearchParams({
          page: `${page}`,
          limit: `${limit}`,
        }).toString();
        return {
          url: `${BASE_PATH}?${params}`,
          method: 'GET',
        };
      },
      providesTags: (result, _error, _arg) => {
        return result
          ? [
              ...result.items.map(({ id }) => ({
                type: TAG_TYPE,
                id,
              })),
              { type: TAG_TYPE, id: 'PARTIAL-LIST' },
            ]
          : [{ type: TAG_TYPE, id: 'PARTIAL-LIST' }];
      },
    }),
    createQuestion: build.mutation<Question, Omit<Question, 'id' | 'exercise'>>(
      {
        query: (Categories: Omit<Question, 'id' | 'exercise'>) => ({
          url: BASE_PATH,
          method: 'POST',
          data: Categories,
        }),
        invalidatesTags: [TAG_TYPE],
      }
    ),
    updateQuestion: build.mutation<Question, Question>({
      query: (question: Question) => ({
        url: `${BASE_PATH}/${question.id}`,
        method: 'PATCH',
        data: question,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    deleteQuestion: build.mutation<Question, string>({
      query: (id: string) => ({
        url: `${BASE_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useFindOneQuestionQuery,
  useFindAllQuestionsQuery,
} = exercisesApi;

const questionsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = questionsSlice;
export default reducer;
