'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { parseYouTube, isAllowedHost, YOUTUBE_DOMAINS } from '../../shared/libs';

import s from './AddVideoScreen.module.css';

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: 'Поле не должно быть пустым' })
    .superRefine((url, ctx) => {
      let parsedURL: URL;
      try {
        parsedURL = new URL(url);
      }
      catch {
        ctx.addIssue({
          code: 'custom',
          message: 'Поле должно содержать ссылку',
          input: url,
        });
        return;
      }

      if (!isAllowedHost(parsedURL.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Ссылка должна быть на YouTube',
          input: url,
        });
      }
    }),
});

type Inputs = {
  videoUrl: string;
};

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({  resolver: zodResolver(schema) });

  const onSubmit = async (data: Inputs) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;

    setVideoId(videoId);

    await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({ videoId }),
    });

    const dataFromServer = await fetch('/api/videos', {
      method: 'GET',
    });

    const response = await dataFromServer.json();

    console.log('dataFromServer', response);
  };

  console.log('errors', errors);

  const hasVideoUrlInputError = !!errors.videoUrl?.message;

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label>
          <input
            type="text"
            placeholder="Ссылку на YouTube видео"
            className={s.input}
            {...register('videoUrl')}
          />

          {hasVideoUrlInputError && (
            <p className={s.error}>{errors.videoUrl?.message}</p>
          )}
        </label>
        <button className={s.submitButton}>Загрузить</button>
      </form>

      {videoId && (
        <iframe width="700" height="350" src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen className={s.iframe} />
      )}
    </div>
  );
};
