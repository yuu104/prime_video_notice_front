import { videoFactory } from "src/models/Video";
import {
  AuthRequestHeader,
  useAuthRequestHeader,
} from "./useAuthRequestHeader";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { videos } from "@prisma/client";

const fetcher = (authRequestHeader: AuthRequestHeader) => {
  return videoFactory().findAll(authRequestHeader);
};

export const useFetchVideo = () => {
  const { isAuthenticated } = useAuth0();
  const { getAuthRequestHeader } = useAuthRequestHeader();

  const {
    data: videos,
    error,
    mutate,
  } = useSWR<videos[]>(isAuthenticated ? "video" : null, async () => {
    const authRequestHeader = await getAuthRequestHeader();
    return fetcher(authRequestHeader);
  });

  return { videos, error, mutate };
};
