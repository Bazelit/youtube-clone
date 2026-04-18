import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from '@/shared/libs';
import { useState } from 'react';

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
  videoCategory: z.string(),
});

type Inputs = {
  videoUrl: string;
  videoCategory: string;
};

export const useAddVideoForm = () => {
  const [videoId, setVideoId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmitHandler = async (data: Inputs) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;

    setVideoId(videoId);

    await fetch('/api/videos', {
      method: 'POST',
      // TODO: не забыть userId
      body: JSON.stringify({ userId: '12345', videoId, categoryId: data.videoCategory }),
    });

    reset();
  };

  return {
    register,
    errors,
    videoId,
    onSubmit: handleSubmit(onSubmitHandler),
  };
}
