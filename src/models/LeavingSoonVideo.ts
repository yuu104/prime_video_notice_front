import { leavingSoonVideoRepository } from "src/repositories/LeavingSoonVideoRepository";

export const leavingSoonVideoFactory = () => {
  return {
    getLeavingSoonVideos: (): Promise<string[]> => {
      return leavingSoonVideoRepository.getLeavingSoonVideos();
    },
  };
};
