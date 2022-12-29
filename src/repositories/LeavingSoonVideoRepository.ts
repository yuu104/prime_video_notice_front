import axios from "axios";

export type LeavingSoonVideoRepository = {
  getIsLeavingSoon: (title: string) => Promise<boolean>;
};

const instance = axios.create({
  baseURL: "http://localhost:3010/backend_api",
});

const resorce = "leaving_soon_videos";

const getIsLeavingSoon = async (title: string): Promise<boolean> => {
  const response = await instance.get(`/${resorce}/${title}`);

  return response.data;
};

export const leavingSoonVideoRepository: LeavingSoonVideoRepository = {
  getIsLeavingSoon,
};
