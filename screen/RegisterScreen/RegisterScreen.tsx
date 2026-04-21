'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import s from './RegisterScreen.module.css';
import Image from 'next/image';
import GoogleLogo from '@/shared/assets/icons/google-logo.svg';

const schema = z.object({
  nickname: z.string().min(1, 'Минимум 1 символ'),
  password: z.string().min(1,'Минимум 1 символ'),
  passwordRepeat: z.string().min(1,'Минимум 1 символ'),
});

type Inputs = {
  nickname: string;
  password: string;
  passwordRepeat: string;
};

export const RegisterScreen = () => {
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (data: Inputs) => {
    if (data.password !== data.passwordRepeat) {
      setError('passwordRepeat', { type: "custom", message: "Пароли не совпадают" });
      return;
    }

    const { nickname, password } = data;

    try {
      const response = await fetch('/api/users/register', {
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
  const hasPasswordRepeatInputError = !!errors.passwordRepeat?.message;

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
          <p className={s.title}>Зарегистрируйся</p>
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

          <label className={s.passwordLabel}>
            <input
              {...register('passwordRepeat')}
              type="password"
              placeholder="Повторите пароль"
              className={s.input}
            />

            {hasPasswordRepeatInputError && (
              <p className={s.error}>{errors.passwordRepeat?.message}</p>
            )}
          </label>

          <div className={s.buttonWrapper}>
            <Link href="/auth/login" className={s.createAccount}>
              Уже есть аккаунт
            </Link>
            <button type="submit" className={s.signUp}>Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
};
