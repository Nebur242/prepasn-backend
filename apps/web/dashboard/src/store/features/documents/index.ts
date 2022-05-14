import { createSlice } from '@reduxjs/toolkit';
import { Status } from '@prepa-sn/shared/enums';
import {
  createApi,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../../../config/api.config';
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { removeAsset, uploadAsset } from '@prepa-sn/shared/services';
import { Document } from '@prepa-sn/shared/interfaces';

export interface DocumentsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  documents: Document[];
}

export const initialState: DocumentsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  documents: [],
};

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Documents'],
  endpoints: (build) => ({
    findOneDocument: build.query<Document, string>({
      query: (id: string) => ({ url: `/documents/${id}`, method: 'GET' }),
    }),
    findAllDocuments: build.query<Document[], void>({
      query: () => ({ url: '/documents', method: 'GET' }),
      providesTags: (result = [], _error, _arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: 'Documents',
          },
        ];
        const other = result.map((document) => ({
          type: 'Documents',
          id: document.id,
        }));
        return [...final, ...other];
      },
    }),
    createDocument: build.mutation<Document, Omit<Document, 'id'>>({
      query: (document: Omit<Document, 'id'>) => ({
        url: '/documents',
        method: 'POST',
        data: document,
      }),
      invalidatesTags: ['Documents'],
    }),

    uploads: build.mutation<Document[], File[]>({
      async queryFn(files, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const documents = await Promise.all(
            files.map(async (file: File): Promise<Partial<Document>> => {
              const uploaded: Partial<Document> = await uploadAsset(file);
              return {
                ...uploaded,
              };
            })
          );

          const result = await fetchWithBQ({
            url: '/documents/bulk',
            method: 'POST',
            data: documents,
          });

          return result.data
            ? { data: result.data as Document[] }
            : { error: result.error as FetchBaseQueryError };
        } catch (error) {
          console.log(error);
          return { error: error as FetchBaseQueryError };
        }
      },
      invalidatesTags: ['Documents'],
    }),

    updateDocument: build.mutation<Document, Document>({
      query: ({ id, ...rest }) => ({
        url: `/documents/${id}`,
        method: 'PATCH',
        data: rest,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Documents', id: arg.id as number },
      ],
    }),
    deleteDocument: build.mutation<Document, Document>({
      async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const deletedFile = await removeAsset(file.fieldname);

          if (deletedFile) {
            const result = await fetchWithBQ({
              url: `/documents/${file.id}`,
              method: 'DELETE',
            });

            return result.data
              ? { data: result.data as Document }
              : { error: result.error as FetchBaseQueryError };
          }

          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: deletedFile,
              error: 'Did not delete file',
            } as FetchBaseQueryError,
          };
        } catch (error) {
          console.log(error);
          return { error: error as FetchBaseQueryError };
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Documents', id: arg.id as number },
      ],
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useFindOneDocumentQuery,
  useFindAllDocumentsQuery,
  useUpdateDocumentMutation,
  useUploadsMutation,
  usePrefetch,
} = documentsApi;

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = documentsSlice;
export default reducer;
