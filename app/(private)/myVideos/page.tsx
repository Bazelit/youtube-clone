import type { Metadata } from "next";
import { MyVideosScreen } from '@/screen/MyVideosScreen';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';
import { HomeScreen } from '@/screen/HomeScreen';

export const metadata: Metadata = {
  title: "Мои видео",
};

export default async function MyVideosPage() {
  const userId = '12345';

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_ARI_URL}/api/videos?userId=${userId}`);

    const response = await dataFromServer.json() as GetAllVideosDto;

    if (!response.data) {
      throw new Error('Нет данных о видео')
    }

    return <MyVideosScreen data={response.data}  />;
  }
  catch (error) {
    console.error(error);
    return <div>Что-то пошло не так</div>;
  }
}
