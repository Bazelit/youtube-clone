import React from 'react';

import { Header } from '../Header';
import { LeftMenu } from '../LeftMenu';

import s from './BaseLayout.module.css';

type BaseLayoutProps = Readonly<{
  children: React.ReactNode;
}> & {
  userId?: string;
};

export const BaseLayout = ({ userId, children }: BaseLayoutProps) => {
  return (
    <div className={s.container}>
      <Header userId={userId} />
      <LeftMenu userId={userId} />
      {children}
    </div>
  );
};
