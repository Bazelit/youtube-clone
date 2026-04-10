type OEmbedVideoInfo = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

type VideoDataContent = {
  userId: string;
  id: string;
  categoryId: string;
};

const videosData = new Map<string, VideoDataContent>([
  ["3fIdpN1sxWM", { userId: "0", id: "3fIdpN1sxWM", categoryId: "games" }],
  ["JkUjd7iFui4", { userId: "0", id: "JkUjd7iFui4", categoryId: "news" }],
  ["ApozMZRld8w", { userId: "0", id: "ApozMZRld8w", categoryId: "fun" }],
  ["XCk1WBvi50A", { userId: "0", id: "XCk1WBvi50A", categoryId: "science" }],
  ["mS31fc6lmFw", { userId: "0", id: "mS31fc6lmFw", categoryId: "news" }],
  ["POaBzbxCgYU", { userId: "0", id: "POaBzbxCgYU", categoryId: "games" }],
  ["6FxKjGPdtTc", { userId: "0", id: "6FxKjGPdtTc", categoryId: "fun" }],
  ["p_copoRtI8Q", { userId: "0", id: "p_copoRtI8Q", categoryId: "fun" }],
  ["g6Xbnz6LRC8", { userId: "0", id: "g6Xbnz6LRC8", categoryId: "games" }],
  ["HWuDdsmZmv8", { userId: "0", id: "HWuDdsmZmv8", categoryId: "science" }],
]);

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const userIdParam = urlObject.searchParams.get("userId");
  const videoIdParam = urlObject.searchParams.get("videoId");
  const categoryIdParam = urlObject.searchParams.get("categoryId");

  if (videoIdParam) {
    try {
      const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoIdParam}&format=json`,
      );
      const videoInfo = (await rawResult.json()) as OEmbedVideoInfo;

      const authorUrl = videoInfo.author_url.split("/").at(-1);

      const result = {
        videoId: videoIdParam,
        authorUrl,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      };

      return Response.json({ ok: true, data: result });
    } catch (error) {
      console.error(error);
      return Response.json({ ok: false, data: null }, { status: 500 });
    }
  }

  try {
    const categories = Array.from(
      new Set([...videosData].map((data) => data[1].categoryId)),
    );

    const promises = [...videosData]
      .filter((data) =>
        categoryIdParam ? data[1].categoryId === categoryIdParam : true,
      )
      .filter((data) => (userIdParam ? data[1].userId === userIdParam : true))
      .map(async (data) => {
        const videoId = data[1].id;
        const categoryId = data[1].categoryId;

        const rawResult = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );
        const videoInfo = (await rawResult.json()) as OEmbedVideoInfo;

        const authorUrl = videoInfo.author_url.split("/").at(-1);

        return {
          videoId,
          authorUrl,
          categoryId,
          title: videoInfo.title,
          authorName: videoInfo.author_name,
        };
      });

    const result = await Promise.all(promises);

    return Response.json({
      ok: true,
      data: result,
      categories,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  if (videosData.has(data.videoId)) {
    return Response.json(
      { ok: false, error: "Видео ранее уже было добавлено" },
      { status: 400 },
    );
  }

  videosData.set(data.videoId, {
    id: data.videoId,
    userId: data.userId,
    categoryId: data.categoryId,
  });

  return Response.json({ ok: true });
}
