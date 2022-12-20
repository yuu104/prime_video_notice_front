import { videos } from "@prisma/client";
import { AuthRequestHeader } from "src/hooks/useAuthRequestHeader";
import { videoRepository } from "src/repositories/VideoRepository";

export type CreateVideoParams = {
  title: string;
  url: string;
  image?: string;
  is_available: boolean;
};

export const videoFactory = () => {
  return {
    findAll: (authRequestHeader: AuthRequestHeader): Promise<videos[]> => {
      return videoRepository.findAll(authRequestHeader);
    },
    createVideo: async (
      params: CreateVideoParams,
      authRequestHeader: AuthRequestHeader,
    ): Promise<void> => {
      await videoRepository.createVideo(params, authRequestHeader);
    },
    deleteVideo: async (
      params: Pick<videos, "id">,
      authRequestHeader: AuthRequestHeader,
    ): Promise<void> => {
      await videoRepository.deleteVideo(params, authRequestHeader);
    },
  };
};
