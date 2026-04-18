import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { HomeScreen } from '@/screen/HomeScreen';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const data = await params;
  const categoryId = data.categoryId;

  const foundCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId);

  if (!foundCategory) {
    return { title: 'Категория не найдена' };
  }

  return {
    title: `Видео в категории: ${foundCategory.title}`,
  };
}

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params;
  const categoryId = data.categoryId;

  const foundCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId);

  if (!foundCategory) return notFound();

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_ARI_URL}/api/videos?categoryId=${categoryId}`);

    const response = await dataFromServer.json() as GetAllVideosDto;

    if (!response.data) {
      throw new Error('Нет данных о видео')
    }

    const finalCategories = VIDEO_CATEGORIES.filter(({ id }) => (
      response.categories.includes(id)
    ));

    return (
      <HomeScreen
        data={response.data}
        categoryId={categoryId}
        categories={finalCategories}
      />
    );
  }
  catch (error) {
    console.error(error);
    return <div>Что-то пошло не так</div>;
  }
}
