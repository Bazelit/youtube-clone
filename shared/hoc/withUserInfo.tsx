import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

export const withUserInfo = <T extends object>(Component: React.FC<T>) => {
  return async (props: T) => {
    try {
      const cookiesStore = await cookies();
      const authToken = cookiesStore.get(AUTH_COOKIE_NAME);

      if (!authToken) {
        throw new Error();
      }

      const rawData = await fetch(`${process.env.SERVER_ARI_URL}/api/users`, {
        method: 'GET',
        headers: {
          cookie: `${AUTH_COOKIE_NAME}=${authToken.value}`,
        },
      });

      const dataFromBackend = await rawData.json();

      return <Component user={dataFromBackend.user} {...props} />;
    }
    catch {
      return <Component {...props} />;
    }
  }
}
