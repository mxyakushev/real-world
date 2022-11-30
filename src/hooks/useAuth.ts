import { authStateSelector } from 'app';
import { useAppSelector } from 'hooks';

export const useAuth = () => useAppSelector(authStateSelector);
