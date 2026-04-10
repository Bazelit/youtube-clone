import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import s from './Header.module.css';

type HeaderProps = {
  profileId: string;
};

export const Header = ({ profileId }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Link href="/">
        <Image width="93" height="20" src="/youtubeLogo.svg" alt="Логотип компании" />
      </Link>

      <div className={s.rightPart}>
        <Link href="/editor/addVideo" className={s.createVideoLink}>
          Создать
        </Link>

        <Link href={`/profile/${profileId}`} className={s.yourProfileLink}>
          <div className={s.hiddenText}>Перейти в свой профиль</div>
        </Link>
      </div>
    </header>
  );
};
