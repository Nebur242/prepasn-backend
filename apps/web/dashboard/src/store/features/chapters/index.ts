import { Status } from '@prepa-sn/shared/enums';
import { Chapter } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface ChaptersInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  chapters: Chapter[];
}

const initialState: ChaptersInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  chapters: [],
};

const NAME = 'chapters' as const;
const BASE_PATH = `/${NAME}` as const;
const TAG_TYPE = `Chapters` as const;

export const chaptersApi = createApi({
  reducerPath: `${NAME}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneChapter: build.query<Chapter, string>({
      query: (id: string) => ({ url: `${BASE_PATH}/${id}`, method: 'GET' }),
    }),
    findAllChapters: build.query<
      Pagination<Chapter>,
      IPaginationOptions & { course: string }
    >({
      query: (pagination: IPaginationOptions & { course: string }) => {
        const { page, limit, course } = pagination;
        const params = new URLSearchParams({
          page: `${page}`,
          limit: `${limit}`,
          course: `${course}`,
        }).toString();

        return {
          url: `${BASE_PATH}?${params}`,
          method: 'GET',
        };
      },
      providesTags: (result, _error, _arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: TAG_TYPE,
          },
        ];
        return [
          ...final,
          ...(result.items?.map((chapter) => ({
            type: TAG_TYPE,
            id: chapter.id,
          })) || []),
        ];
      },
    }),
    createChapter: build.mutation<Chapter, Omit<Chapter, 'id'>>({
      query: (chapter: Omit<Chapter, 'id'>) => ({
        url: `${BASE_PATH}`,
        method: 'POST',
        data: chapter,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateChapter: build.mutation<Chapter, Chapter>({
      query: (chapter: Chapter) => ({
        url: `${BASE_PATH}/${chapter.id}`,
        method: 'PATCH',
        data: chapter,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPE, id: arg.id },
      ],
    }),
    deleteChapter: build.mutation<Chapter, number>({
      query: (id: number) => ({
        url: `${BASE_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useFindAllChaptersQuery,
  useFindOneChapterQuery,
} = chaptersApi;

const chapterSlice = createSlice({
  name: TAG_TYPE,
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = chapterSlice;
export default reducer;
