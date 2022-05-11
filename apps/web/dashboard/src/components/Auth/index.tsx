import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { authenticateUser } from '../../store/features/auth';
import { usePrefetch as usePrefetchGrades } from '../../store/features/grades';
import { usePrefetch as usePrefetchDocuments } from '../../store/features/documents';
import { usePrefetch as usePrefetchCourses } from '../../store/features/courses';
import Loader from '../Loader';

type Props = {
  children: ReactNode;
};

const Auth: FC<Props> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const fetchAllGrades = usePrefetchGrades('findAllGrades');
  const fetchAllDocuments = usePrefetchDocuments('findAllDocuments');
  const fetchAllCourses = usePrefetchCourses('findAllCourses');


  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch])

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchAllGrades();
      fetchAllDocuments();
      fetchAllCourses();
    }
  }, [auth, fetchAllGrades, fetchAllDocuments, fetchAllCourses])

  if (auth.loading) return <Loader />;
  return <> {children} </>;
}

export default Auth;
