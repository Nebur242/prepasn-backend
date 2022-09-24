import { Status } from '@prepa-sn/shared/enums';
import { Section } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface SectionsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  sections: Section[];
}

const initialState: SectionsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  sections: [],
};

const BASE_PATH = `/sections` as const;
const TAG_TYPE = `Sections` as const;
const NAME = 'sections' as const;

export const sectionsApi = createApi({
  reducerPath: `${NAME}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneSection: build.query<Section, string>({
      query: (id: string) => ({ url: `${BASE_PATH}/${id}`, method: 'GET' }),
    }),
    findAllSections: build.query<
      Pagination<Section>,
      IPaginationOptions & { chapter: string }
    >({
      query: (pagination) => {
        const { page, limit, chapter } = pagination;
        const params = new URLSearchParams({
          page: `${page}`,
          limit: `${limit}`,
          chapter: `${chapter}`,
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
    createSection: build.mutation<
      Section,
      Omit<Section, 'id' | 'chapter'> | { chapter: number }
    >({
      query: (Categories: Omit<Section, 'id' | 'chapter'>) => ({
        url: BASE_PATH,
        method: 'POST',
        data: Categories,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateSection: build.mutation<Section, Section>({
      query: (section: Section) => ({
        url: `${BASE_PATH}/${section.id}`,
        method: 'PATCH',
        data: section,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    deleteSection: build.mutation<Section, string>({
      query: (id: string) => ({
        url: `${BASE_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateSectionMutation,
  useFindOneSectionQuery,
  useDeleteSectionMutation,
  useFindAllSectionsQuery,
  useUpdateSectionMutation,
} = sectionsApi;

const SectionsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = SectionsSlice;
export default reducer;
