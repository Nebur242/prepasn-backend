import { Status } from '@prepa-sn/shared/enums';
import { Chapter } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
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

export const chaptersApi = createApi({
  reducerPath: 'chaptersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Chapters'],
  endpoints: (build) => ({
    findOneChapter: build.query<Chapter, string>({
      query: (id: string) => ({ url: `/chapters/${id}`, method: 'GET' }),
    }),
    findAllChapters: build.query<Chapter[], void>({
      query: () => ({ url: '/chapters', method: 'GET' }),
      providesTags: (result, _error, _arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: 'Chapters',
          },
        ];
        return [
          ...final,
          ...(result?.map((chapter) => ({
            type: 'Chapters',
            id: chapter.id,
          })) || []),
        ];
      },
    }),
    createChapter: build.mutation<Chapter, Omit<Chapter, 'id'>>({
      query: (chapter: Omit<Chapter, 'id'>) => ({
        url: '/chapters',
        method: 'POST',
        data: chapter,
      }),
      invalidatesTags: ['Chapters'],
    }),
    updateChapter: build.mutation<Chapter, Chapter>({
      query: (chapter: Chapter) => ({
        url: `/chapters/${chapter.id}`,
        method: 'PATCH',
        data: chapter,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Chapters', id: arg.id },
      ],
    }),
    deleteChapter: build.mutation<Chapter, number>({
      query: (id: number) => ({
        url: `/chapters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chapters'],
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
  name: 'chapters',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = chapterSlice;
export default reducer;
