/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useFindOneGradeQuery } from "apps/web/dashboard/src/store/features/grades";
import { useParams } from "react-router-dom";

const UpdateGrade = () => {
    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading } = useFindOneGradeQuery(id!);

    console.log(data, isLoading, error, id);

    return (
        <div>update</div>
    )
}

export default UpdateGrade