"use client";

import Image from "next/image";
import Link from "next/link";

import s from "./HomeScreen.module.css";
import { GetAllVideosDto } from "@/shared/types/types-from-backend";

type HomeScreenProps = {
  data: GetAllVideosDto["data"];
};

export const HomeScreen = ({ data }: HomeScreenProps) => {
  return (
    <div className={s.container}>
      {data && data?.length > 0 ? (
        data.map((videoInfo) => (
          <div className={s.videoBlock} key={videoInfo.videoId}>
            <Link
              href={`/video/${videoInfo.videoId}`}
              className={s.videoPreview}
            >
              <Image
                fill
                unoptimized
                src={`https://img.youtube.com/vi/${videoInfo.videoId}/hqdefault.jpg`}
                alt="Видео с ютуба"
                className={s.videoImg}
              />
            </Link>

            <div className={s.videoInfoContainer}>
              <Link
                href={`/profile/${videoInfo.authorUrl}`}
                className={s.channelImage}
              >
                <div className={s.hiddenText}>{videoInfo.authorName}</div>
              </Link>

              <div className={s.videoInfo}>
                <Link
                  href={`/video/${videoInfo.videoId}`}
                  className={s.videoTitleLink}
                >
                  <b>{videoInfo.title}</b>
                </Link>

                <Link
                  href={`/profile/${videoInfo.authorUrl}`}
                  className={s.channelNameLink}
                >
                  {videoInfo.authorName}
                </Link>
              </div>
            </div>

            <Link href={`/video/${videoInfo.videoId}`} className={s.link} />
          </div>
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};
