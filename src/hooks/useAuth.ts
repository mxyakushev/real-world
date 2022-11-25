import { authTypeStateSelector } from 'app';
import { useAppSelector } from 'hooks';

export const useAuth = () => useAppSelector(authTypeStateSelector);
