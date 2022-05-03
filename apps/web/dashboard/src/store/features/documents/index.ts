import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '@prepa-sn/shared/enums';
import { Document } from '../../../common/interfaces/documents.interface';
import { findAll } from '../../../services/documents';
import { AxiosError } from 'axios';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../../../config/api.config';

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
    createDocument: build.mutation<Document, Document>({
      query: (document: Document) => ({
        url: '/documents',
        method: 'POST',
        data: document,
      }),
    }),
    updateDocument: build.mutation<Document, string>({
      query: (id: string) => ({ url: `/documents/${id}`, method: 'PATCH' }),
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
