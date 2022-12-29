import { leavingSoonVideoRepository } from "src/repositories/LeavingSoonVideoRepository";

export const leavingSoonVideoFactory = () => {
  return {
    getIsLeavingSoon: (title: string): Promise<boolean> => {
      return leavingSoonVideoRepository.getIsLeavingSoon(title);
    },
  };
};
