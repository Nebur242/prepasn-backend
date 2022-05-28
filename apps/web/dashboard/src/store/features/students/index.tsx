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
        createStudent: builder.mutation<Student, Omit<Student, 'id'>>({
            query: (student: Omit<Student, 'id'>) => ({
                url: BASE_PATH,
                method: 'POST',
                data: student,
            }),
            invalidatesTags: [TAG_TYPE],
        }),
        updateStudent: builder.mutation<Document, Partial<Student>>({
            query: ({ id, ...updated }) => ({
                url: `${BASE_PATH}/${id}`,
                method: 'PATCH',
                data: updated,
            }),
        }),
    })
})

export const {
    useCreateStudentMutation,
    useFindAllStudentsQuery,
    useUpdateStudentMutation,
} = studentsApi


const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: {},
});

const { reducer } = studentsSlice;
export default reducer;

