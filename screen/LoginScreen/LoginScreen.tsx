'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import GoogleLogo from '@/shared/assets/icons/google-logo.svg';
import s from './LoginScreen.module.css';

const schema = z.object({
  nickname: z.string().min(1, 'Минимум 1 символ'),
  password: z.string().min(1,'Минимум 1 символ'),
});

type Inputs = {
  nickname: string;
  password: string;
};

export const LoginScreen = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (data: Inputs) => {
    const { nickname, password } = data;

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ nickname, password }),
      });

      if (response.ok) {
        router.replace('/');
      }
    }
    catch (error) {
      console.error(error);
    }
  });

  const hasNicknameInputError = !!errors.nickname?.message;
  const hasPasswordInputError = !!errors.password?.message;

  return (
    <div className={s.container}>
      <div className={s.tile}>
        <div className={s.leftPart}>
          <Image
            unoptimized
            src={GoogleLogo}
            width="48"
            height="48"
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          <p className={s.title}>Войти</p>
          <p className={s.subtitle}>чтобы использовать YouTube</p>
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <label>
            <input
              {...register('nickname')}
              type="text"
              placeholder="Никнейм"
              className={s.input}
            />

            {hasNicknameInputError && (
              <p className={s.error}>{errors.nickname?.message}</p>
            )}
          </label>

          <label className={s.passwordLabel}>
            <input
              {...register('password')}
              type="password"
              placeholder="Пароль"
              className={s.input}
            />

            {hasPasswordInputError && (
              <p className={s.error}>{errors.password?.message}</p>
            )}
          </label>

          <div className={s.buttonWrapper}>
            <Link href="/auth/register" className={s.createAccount}>
              Нет аккаунта
            </Link>
            <button type="submit" className={s.signIn}>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};
