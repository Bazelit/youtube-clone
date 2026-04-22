'use client';

import React from 'react';
import { VideoDto } from '@/shared/types/typesFromBackend';

import s from './VideoScreen.module.css';
import Link from 'next/link';

type VideoScreenProps = {
  data: VideoDto;
};

export const VideoScreen = ({ data }: VideoScreenProps) => {
  return (
    <div className={s.container}>
      <iframe className={s.iframe} width="550" height="300" src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen />

      <b className={s.videoTitle}>{data.title}</b>

      <div className={s.videoInfoContainer}>
        <Link href={`/profile/${data.authorUrl}`} className={s.channelImage}>
          <div className={s.hiddenText}>{data.authorName}</div>
        </Link>

        <Link href={`/profile/${data.authorUrl}`} className={s.channelNameLink}>
          {data.authorName}
        </Link>
      </div>
    </div>
  );
};
