import axios from "axios";

export type LeavingSoonVideoRepository = {
  getLeavingSoonVideos: () => Promise<string[]>;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/backend_api`,
});

const resorce = "leaving_soon_videos";

const getLeavingSoonVideos = async (): Promise<string[]> => {
  const response = await instance.get(`/${resorce}`);

  return response.data;
};

export const leavingSoonVideoRepository: LeavingSoonVideoRepository = {
  getLeavingSoonVideos,
};
