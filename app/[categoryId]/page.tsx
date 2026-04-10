import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Видео в категории: ...",
};

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params;
  const categoryId = data.categoryId;

  console.log('categoryId', categoryId);

  return (
    <div>
      CategoryPage: {categoryId}
    </div>
  );
}
