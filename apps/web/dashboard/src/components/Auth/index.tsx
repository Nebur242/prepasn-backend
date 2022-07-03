import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { authenticateUser } from '../../store/features/auth';
import Loader from '../Loader';

type Props = {
  children: ReactNode;
};

const Auth: FC<Props> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);


  if (auth.loading) return <Loader />;
  return <> {children} </>;
};

export default Auth;
