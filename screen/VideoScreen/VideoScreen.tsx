"use client";

import React, { useEffect } from "react";

import s from "./VideoScreen.module.css";
import Link from "next/link";
import { GetOneVideoDto } from "@/shared/types/types-from-backend";

type VideoScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<GetOneVideoDto["data"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await fetch(`/api/videos?videoId=${videoId}`);

        const response = (await dataFromServer.json()) as GetOneVideoDto;

        if (response.data) {
          setData(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [videoId]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!data) {
    return <div>Видео не найдено</div>;
  }

  console.log(data);

  return (
    <div className={s.container}>
      <iframe
        className={s.iframe}
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

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
