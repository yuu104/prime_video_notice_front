import { leavingSoonVideoFactory } from "src/models/LeavingSoonVideo";
import useSWR from "swr";

const fetcher = (): Promise<string[]> => {
  return leavingSoonVideoFactory().getLeavingSoonVideos();
};

export const useFetchLeavingSoonVideos = () => {
  const { data: leavingSoonVideos, error } = useSWR(
    "leaving-soon-videos",
    fetcher,
  );

  return { leavingSoonVideos, error };
};
