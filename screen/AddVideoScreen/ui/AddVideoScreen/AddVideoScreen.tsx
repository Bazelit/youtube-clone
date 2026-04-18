'use client';

import React from 'react';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';

import { useAddVideoForm } from '../../lib/useAddVideoForm';

import s from './AddVideoScreen.module.css';

export const AddVideoScreen = () => {
  const {
    videoId,
    errors,
    register,
    onSubmit,
  } = useAddVideoForm();

  const hasVideoUrlInputError = !!errors.videoUrl?.message;

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit} className={s.form}>
        <select {...register('videoCategory')} className={s.select}>
          {VIDEO_CATEGORIES.map((data) => (
            <option value={data.id} key={data.id}>{data.title}</option>
          ))}
        </select>

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
