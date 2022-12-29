import axios from "axios";

export type LeavingSoonVideoRepository = {
  getIsLeavingSoon: (title: string) => Promise<boolean>;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/backend_api`,
});

const resorce = "leaving_soon_videos";

const getIsLeavingSoon = async (title: string): Promise<boolean> => {
  const response = await instance.get(`/${resorce}/${title}`);

  return response.data;
};

export const leavingSoonVideoRepository: LeavingSoonVideoRepository = {
  getIsLeavingSoon,
};
