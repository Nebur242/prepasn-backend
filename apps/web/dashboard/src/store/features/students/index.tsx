import { Status } from "@prepa-sn/shared/enums";
import { Student } from "@prepa-sn/shared/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { axiosBaseQuery } from "../../../config/api.config";

export interface StudentsInitialState {
    loading: boolean;
    error: string;
    status: Status.PENDING | Status.SUCCESS | Status.ERROR;
    students: Student[];
}

export const initialState: StudentsInitialState = {
    loading: false,
    error: '',
    status: Status.PENDING,
    students: [],
};

const BASE_PATH = `/students` as const;
const TAG_TYPE = `Students` as const;

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: [TAG_TYPE],
    endpoints: (builder) => ({
        findAllStudents: builder.query<Pagination<Student>, IPaginationOptions>({
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
        findOneStudent: builder.query<Student, { id: string }>({
            query: ({ id }) => ({
                url: `${BASE_PATH}/${id}`,
                method: 'GET',
            }),
            providesTags: (result, _error, _arg) => {
                return result
                    ? [
                        {
                            type: TAG_TYPE,
                            id: result.id,
                        },
                    ]
                    : [];
            },
        }),
        createStudent: builder.mutation<Student, Omit<Student, 'id'>>({
            query: (student: Omit<Student, 'id'>) => ({
                url: BASE_PATH,
                method: 'POST',
                data: student,
            }),
            invalidatesTags: [TAG_TYPE],
        }),
        updateStudent: builder.mutation<Document, Partial<Student>>({
            query: ({ uid, ...updated }) => ({
                url: `${BASE_PATH}/${uid}`,
                method: 'PATCH',
                data: updated,
            }),
        }),
        deleteStudent: builder.mutation<Document, { uid: string }>({
            query: ({ uid }) => ({
                url: `${BASE_PATH}/${uid}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TAG_TYPE],
        }),
    })
})

export const {
    useCreateStudentMutation,
    useFindAllStudentsQuery,
    useUpdateStudentMutation,
    useFindOneStudentQuery,
    useDeleteStudentMutation
} = studentsApi


const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: {},
});

const { reducer } = studentsSlice;
export default reducer;

