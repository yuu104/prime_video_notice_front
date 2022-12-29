import { primeVideoRepository } from "src/repositories/PrimeVideoRepository";

export type PrimeVideo = {
  title: string;
  url: string;
  image: string;
  is_available: boolean;
};

export const primeVideoFactory = () => {
  return {
    searchVideos: (params: { keyword: string }): Promise<PrimeVideo[]> => {
      return primeVideoRepository.searchVideos(params);
    },
  };
};
