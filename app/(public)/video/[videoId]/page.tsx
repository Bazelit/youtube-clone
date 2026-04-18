import type { Metadata } from "next";
import { VideoScreen } from '@/screen/VideoScreen';
import { GetOneVideoDto } from '@/shared/types/typesFromBackend';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const data = await params;
  const videoId = data.videoId;

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_ARI_URL}/api/videos?videoId=${videoId}`);
    const response = await dataFromServer.json() as GetOneVideoDto;

    if (!response.data) {
      throw new Error('Нет данных о видео')
    }

    return {
      title: `Видео: ${response.data.title}`,
    };
  }
  catch (error) {
    console.error(error);
    return {
      title: 'Что-то пошло не так',
    };
  }
}

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params;
  const videoId = data.videoId;

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_ARI_URL}/api/videos?videoId=${videoId}`);

    const response = await dataFromServer.json() as GetOneVideoDto;

    if (!response.data) {
      throw new Error('Нет данных о видео')
    }

    return <VideoScreen data={response.data} />;
  }
  catch (error) {
    console.error(error);
    return <div>Что-то пошло не так</div>;
  }
}
