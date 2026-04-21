'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import HomeIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/profile-round.svg';
import AddVideo from '@/shared/assets/icons/add-circle.svg';
import YourVideos from '@/shared/assets/icons/video-library.svg';
import LogOut from '@/shared/assets/icons/logout.svg';

import s from './LeftMenu.module.css';

type LeftMenuProps = {
  userId?: string;
};

export const LeftMenu = ({ userId }: LeftMenuProps) => {
  const router = useRouter();

  const onLogOut = async () => {
    await fetch('/api/users/logout');
    router.refresh();
  }

  return (
    <aside className={s.leftMenu}>
      <nav className={s.nav}>
        <Link href="/" className={s.link}>
          <Image
            unoptimized
            src={HomeIcon}
            width="24"
            height="24"
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          Главная
        </Link>

        {userId && (
          <>
            <Link href="/profile/123" className={s.link}>
              <Image
                unoptimized
                src={ProfileIcon}
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
                className={s.icon}
              />
              Профиль
            </Link>

            <div className={s.divider} />

            <Link href="/editor/addVideo" className={s.link}>
              <Image
                unoptimized
                src={AddVideo}
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
                className={s.icon}
              />
              Добавить видео
            </Link>
            <Link href="/myVideos" className={s.link}>
              <Image
                unoptimized
                src={YourVideos}
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
                className={s.icon}
              />
              Ваши видео
            </Link>
            <button type="button" className={s.link} onClick={onLogOut}>
              <Image
                unoptimized
                src={LogOut}
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
                className={s.icon}
              />
              Выйти
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};
