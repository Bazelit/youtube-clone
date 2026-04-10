import React from 'react';

import { Header } from '../Header';
import { LeftMenu } from '../LeftMenu';

import s from './BaseLayout.module.css';

type BaseLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className={s.container}>
      <Header profileId="123" />
      <LeftMenu />
      {children}
    </div>
  );
};
