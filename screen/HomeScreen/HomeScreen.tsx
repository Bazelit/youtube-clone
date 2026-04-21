'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { DEFAULT_CATEGORY, VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';
import { VideosList } from '@/widgets/VideosList';

import s from './HomeScreen.module.css';

type HomeScreenProps = {
  data: GetAllVideosDto['data'];
  categoryId?: string;
  categories: typeof VIDEO_CATEGORIES;
};


export const HomeScreen = ({ data, categoryId, categories }: HomeScreenProps) => {
  return (
    <div className={s.container}>
      <div className={s.categoriesContainer}>
        <Link
          href="/"
          className={cn(s.categoryLink, {
              [s.activeCategoryLink]: !categoryId,
          })}
        >
          {DEFAULT_CATEGORY.title}
        </Link>

        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={cn(s.categoryLink, {
                [s.activeCategoryLink]: category.id === categoryId,
              })}
            >
              {category.title}
            </Link>
          ))
        }
      </div>

      <VideosList data={data} />
    </div>
  );
};
