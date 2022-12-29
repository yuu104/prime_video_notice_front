import axios from "axios";
import { PrimeVideo } from "src/models/PrimeVideo";

export type PrimeVideoRepository = {
  searchVideos: (params: { keyword: string }) => Promise<PrimeVideo[]>;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/prime_video_api`,
});

const resorce = "prime_videos";

const searchVideos = async (params: {
  keyword: string;
}): Promise<PrimeVideo[]> => {
  const { keyword } = params;
  const response = await instance.get(`${resorce}?keyword=${keyword}`);

  return response.data;
};

export const primeVideoRepository: PrimeVideoRepository = {
  searchVideos,
};
