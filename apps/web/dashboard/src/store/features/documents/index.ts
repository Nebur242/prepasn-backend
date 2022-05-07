import { createSlice } from '@reduxjs/toolkit';
import { Status } from '@prepa-sn/shared/enums';
import {
  createApi,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../../../config/api.config';
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { uploadFileToFirebase } from '@prepa-sn/shared/services';
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
  endpoints: (build) => ({
    findOneDocument: build.query<Document, string>({
      query: (id: string) => ({ url: `/documents/${id}`, method: 'GET' }),
    }),
    findAllDocuments: build.query<Document[], void>({
      query: () => ({ url: '/documents', method: 'GET' }),
    }),
    createDocument: build.mutation<Document, Omit<Document, 'id'>>({
      query: (document: Omit<Document, 'id'>) => ({
        url: '/documents',
        method: 'POST',
        data: document,
      }),
    }),
    uploadDocuments: build.mutation<Document[], { documents: FormData }>({
      query: ({ documents }) => ({
        url: '/documents/uploads',
        method: 'POST',
        data: documents,
      }),
    }),
    uploads: build.mutation<Document[], File[]>({
      async queryFn(files, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const documents = await Promise.all(
            files.map(async (file: File): Promise<Partial<Document>> => {
              const uploaded: Partial<Document> = await uploadFileToFirebase(
                file
              );
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
    }),

    updateDocument: build.mutation<Document, Document>({
      query: ({ id, ...rest }) => ({
        url: `/documents/${id}`,
        method: 'PATCH',
        data: rest,
      }),
    }),
    deleteDocument: build.mutation<Document, number>({
      query: (id: number) => ({ url: `/documents/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useFindOneDocumentQuery,
  useFindAllDocumentsQuery,
  useUpdateDocumentMutation,
  useUploadDocumentsMutation,
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
