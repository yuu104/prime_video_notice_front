import { videos } from "@prisma/client";
import axios from "axios";
import { AuthRequestHeader } from "src/hooks/useAuthRequestHeader";
import { CreateVideoParams } from "src/models/Video";

export type VideoRepository = {
  findAll: (authRequestHeader: AuthRequestHeader) => Promise<videos[]>;
  createVideo: (
    params: CreateVideoParams,
    authRequestHeader: AuthRequestHeader,
  ) => Promise<void>;
  deleteVideo: (
    id: number,
    authRequestHeader: AuthRequestHeader,
  ) => Promise<void>;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/backend_api`,
});

const resorce = "/videos";

const findAll = async (
  authRequestHeader: AuthRequestHeader,
): Promise<videos[]> => {
  const response = await instance.get(`${resorce}`, {
    headers: authRequestHeader,
  });

  return response.data;
};

const createVideo = async (
  params: CreateVideoParams,
  authRequestHeader: AuthRequestHeader,
): Promise<void> => {
  return instance.post(`${resorce}`, params, { headers: authRequestHeader });
};

const deleteVideo = (
  id: number,
  authRequestHeader: AuthRequestHeader,
): Promise<void> => {
  return instance.delete(`${resorce}/${id}`, { headers: authRequestHeader });
};

export const videoRepository: VideoRepository = {
  findAll,
  createVideo,
  deleteVideo,
};
