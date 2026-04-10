export type VideoDto = {
  videoId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetAllVideosDto = {
  ok: boolean;
  data: VideoDto[];
};

export type GetOneVideoDto = {
  ok: boolean;
  data: VideoDto | null;
};
