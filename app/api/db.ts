type UserId = string;

type UserContent = {
  id: UserId;
  nickname: string;
  password: string;
};

export type UserInfoFromToken = {
  id: UserContent['id'];
  nickname: string;
  iat: number;
}

// -------

type VideoId = string;

type VideoDataContent = {
  userId: string;
  id: VideoId;
  categoryId: string;
};

// -------

declare global {
  var dbUsers: Map<UserId, UserContent> | undefined;
  var dbVideos: Map<VideoId, VideoDataContent> | undefined;
}

export const users = globalThis.dbUsers || (
  globalThis.dbUsers = new Map<UserId, UserContent>()
);

export const videos = globalThis.dbVideos || (
  globalThis.dbVideos = new Map<VideoId, VideoDataContent>([
    ['3fIdpN1sxWM', { userId: '0', id: '3fIdpN1sxWM', categoryId: 'games' }],
    ['JkUjd7iFui4', { userId: '0', id: 'JkUjd7iFui4', categoryId: 'news' }],
    ['ApozMZRld8w', { userId: '0', id: 'ApozMZRld8w', categoryId: 'fun' }],
    ['XCk1WBvi50A', { userId: '0', id: 'XCk1WBvi50A', categoryId: 'science' }],
    ['mS31fc6lmFw', { userId: '0', id: 'mS31fc6lmFw', categoryId: 'news' }],
    ['POaBzbxCgYU', { userId: '0', id: 'POaBzbxCgYU', categoryId: 'games' }],
    ['6FxKjGPdtTc', { userId: '0', id: '6FxKjGPdtTc', categoryId: 'fun' }],
    ['p_copoRtI8Q', { userId: '0', id: 'p_copoRtI8Q', categoryId: 'fun' }],
    ['g6Xbnz6LRC8', { userId: '0', id: 'g6Xbnz6LRC8', categoryId: 'games' }],
    ['HWuDdsmZmv8', { userId: '0', id: 'HWuDdsmZmv8', categoryId: 'science' }],
  ])
);
