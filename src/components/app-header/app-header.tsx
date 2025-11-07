import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.userData?.name);

  return <AppHeaderUI userName={userName} />;
};
