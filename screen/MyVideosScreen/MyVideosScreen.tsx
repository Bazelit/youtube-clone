'use client';

import React from 'react';

import { GetAllVideosDto } from '@/shared/types/typesFromBackend';

import { VideosList } from '@/widgets/VideosList';

import s from './MyVideosScreen.module.css';

type MyVideosScreenProps = {
  data: GetAllVideosDto['data'];
};

export const MyVideosScreen = ({ data }: MyVideosScreenProps) => {
  return (
    <div className={s.container}>
      <VideosList data={data} />
    </div>
  );
};
