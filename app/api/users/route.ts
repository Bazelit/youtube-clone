import jsonwebtoken from 'jsonwebtoken';
import { cookies} from 'next/headers';
import { UserInfoFromToken, users } from '../db';
import { env } from '@/shared/libs/env';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

export async function GET() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    return Response.json({ ok: false, message: 'Токен устарел' }, { status: 400 });
  }

  try {
    const userInfo = jsonwebtoken.verify(token.value, env.JWT_SECRET) as UserInfoFromToken;

    const user = users.get(userInfo.nickname);

    if (!user) {
      return Response.json({ ok: false, message: 'Пользователь не найден' }, { status: 500 });
    }

    const { id, nickname } = user;

    return Response.json({ ok: true, user: { id, nickname } });
  }
  catch (error) {
    return Response.json({ ok: false, message: 'Токен устарел' }, { status: 400 });
  }
}
