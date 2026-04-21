import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ProfileIcon from '@/shared/assets/icons/profile-round.svg';

import s from './Header.module.css';

type HeaderProps = {
  userId?: string;
};

export const Header = ({ userId }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Link href="/">
        <Image width="93" height="20" src="/youtubeLogo.svg" alt="Логотип компании" />
      </Link>

      <div className={s.rightPart}>
        {userId ? (
          <>
            <Link href="/editor/addVideo" className={s.createVideoLink}>
              Создать
            </Link>

            <Link href={`/profile/${userId}`} className={s.yourProfileLink}>
              <div className={s.hiddenText}>Перейти в свой профиль</div>
            </Link>
          </>
        ) : (
          <Link href="/auth/login" className={s.signIn}>
            <Image
              unoptimized
              src={ProfileIcon}
              width="20"
              height="20"
              alt=""
              aria-hidden="true"
              className={s.icon}
            />
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};
