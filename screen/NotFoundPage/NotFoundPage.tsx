import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import s from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <Image
        unoptimized
        width="185"
        height="174"
        src="/monkey.png"
        alt="Страница не найдена"
        className={s.image}
      />

      <p>Эта страница недоступна.</p>
      <p>Может, поискать что-нибудь другое?</p>

      <Link href="/" className={s.link}>
        <Image width="145" height="30" src="/youtubeLogo.svg" alt="Логотип компании" />
      </Link>
    </div>
  );
};
