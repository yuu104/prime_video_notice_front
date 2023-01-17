import { FC, memo, useCallback } from "react";
import { useFetchVideo } from "src/hooks/useFetchVideo";
import { Layout } from "../Layout";
import styles from "@styles/pages/NoticeList.module.scss";
import { NextImage } from "../NextImage";
import { videoFactory } from "src/models/Video";
import { useAuthRequestHeader } from "src/hooks/useAuthRequestHeader";
import { videos } from "@prisma/client";

export const NoticeListContainer: FC = () => {
  const { videos, error, mutate } = useFetchVideo();

  const { getAuthRequestHeader } = useAuthRequestHeader();

  const deleteVideo = useCallback(
    async (id: number) => {
      try {
        const authRequestHeader = await getAuthRequestHeader();

        await videoFactory().deleteVideo(id, authRequestHeader);

        mutate(videos?.filter((video) => video.id !== id));
      } catch (e) {
        console.log(e);
        alert("削除に失敗しました");
      }
    },
    [videos],
  );

  if (error) return <div>error</div>;

  return <NoticeList videos={videos} deleteVideo={deleteVideo} />;
};

type NoticeListProps = {
  videos?: videos[];
  deleteVideo: (id: number) => Promise<void>;
};

const NoticeList: FC<NoticeListProps> = memo(({ videos, deleteVideo }) => {
  return (
    <Layout>
      <h1 className={styles.title}>リスト表示</h1>
      <ul className={styles.tabs}>
        <li className={styles.tabItem}>配信終了予定になったら通知</li>
      </ul>
      {videos && videos.length ? (
        <div className={styles.videoList}>
          {videos.map((video) => (
            <div key={video.id} className={styles.videoItem}>
              <div className={styles.videoImage}>
                <NextImage src={video.image!} alt={video.title} />
              </div>
              <div className={styles.videoItemRightBox}>
                <div className={styles.videoTitle}>{video.title}</div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteVideo(video.id)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noVideos}>リスト登録された作品はありません</div>
      )}
    </Layout>
  );
});
