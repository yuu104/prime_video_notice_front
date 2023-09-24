import { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "@styles/components/PrimeVideoInfo.module.scss";
import { NextImage } from "./NextImage";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthRequestHeader } from "src/hooks/useAuthRequestHeader";
import { videoFactory } from "src/models/Video";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetchLeavingSoonVideos } from "src/hooks/useFetchLeavingSoonVideos";
import { PrimeVideo } from "src/models/PrimeVideo";

type PrimeVideoInfoContainerProps = {
  video: PrimeVideo;
  closeModal: () => void;
};

export const PrimeVideoInfoContainer: FC<PrimeVideoInfoContainerProps> = ({
  video,
  closeModal,
}) => {
  const { isAuthenticated } = useAuth0();

  const { getAuthRequestHeader } = useAuthRequestHeader();

  const { leavingSoonVideos } = useFetchLeavingSoonVideos();

  const [isLeavingSoon, setIsLeavingSoon] = useState<boolean>();

  useEffect(() => {
    if (leavingSoonVideos?.find((item) => item === video.title)) {
      setIsLeavingSoon(true);
    } else {
      setIsLeavingSoon(false);
    }
  }, [leavingSoonVideos, video.title]);

  const register = useCallback(async () => {
    if (!isAuthenticated) {
      alert("リスト登録をするにはログインが必要です");
      return;
    }
    try {
      const authRequestHeader = await getAuthRequestHeader();
      await videoFactory().createVideo(video, authRequestHeader);

      closeModal();
    } catch (e) {
      console.error(e);
      alert("登録に失敗しました");
    }
  }, [isAuthenticated, video, getAuthRequestHeader, closeModal]);

  if (typeof isLeavingSoon === "undefined") return <SkeletonBoard />;

  return (
    <PrimeVideoInfo
      video={video}
      isLeavingSoon={isLeavingSoon}
      closeModal={closeModal}
      register={register}
    />
  );
};

type PrimeVideoInfoProps = {
  video: PrimeVideo;
  isLeavingSoon: boolean;
  closeModal: () => void;
  register: () => Promise<void>;
};

const PrimeVideoInfo: FC<PrimeVideoInfoProps> = memo(
  ({ video, isLeavingSoon, closeModal, register }) => {
    const { title, image, url, is_available } = video;

    return (
      <div className={styles.container}>
        <div className={styles.closeIcon} onClick={closeModal}>
          <NextImage src={"/xmark-white.svg"} alt={"xmark-white"} />
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.title} ${styles.titleSp}`}>{title}</div>
          <div className={styles.imageConteiner}>
            <Link href={url}>
              <div className={styles.imageLink}>
                <NextImage src={image} alt={title} />
              </div>
            </Link>
            <div className={styles.description}>
              画像をクリックしてサイトへ移動
            </div>
          </div>
          <div className={styles.leftBox}>
            <div className={`${styles.title} ${styles.titleTab}`}>{title}</div>
            <div className={styles.details}>
              <div className={styles.detailsItem}>
                <span>無料で閲覧可能：</span>
                <div className={styles.cicleOrXmarkIcon}>
                  {is_available ? (
                    <NextImage src={"/circle.svg"} alt={"circle-icon"} />
                  ) : (
                    <NextImage src={"/xmark-red.svg"} alt={"xmark-red-icon"} />
                  )}
                </div>
              </div>
              <div className={styles.detailsItem}>
                <span>配信終了予定：</span>
                <div className={styles.cicleOrXmarkIcon}>
                  {isLeavingSoon ? (
                    <NextImage src={"/circle.svg"} alt={"circle-icon"} />
                  ) : (
                    <NextImage src={"/xmark-red.svg"} alt={"xmark-red-icon"} />
                  )}
                </div>
              </div>
            </div>
            <button
              className={styles.registerButton}
              onClick={register}
              disabled={!(is_available && !isLeavingSoon)}
            >
              リストへ登録
            </button>
            <div className={styles.description}>
              配信終了予定になるとメールでお知らせします
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const SkeletonBoard: FC = memo(() => {
  return (
    <SkeletonTheme baseColor="#222222" highlightColor="#333333">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={`${styles.title} ${styles.titleSp}`}>
            <Skeleton width={230} />
          </div>
          <div className={styles.imageConteiner}>
            <Skeleton className={styles.imageLink} />
          </div>
          <div className={styles.leftBox}>
            <div className={`${styles.title} ${styles.titleTab}`}>
              <Skeleton width={230} />
            </div>
            <div className={styles.details}>
              <div className={styles.detailsItem}>
                <Skeleton width={120} />
              </div>
              <div className={styles.detailsItem}>
                <Skeleton width={120} />
              </div>
            </div>
            <Skeleton width={140} height={32} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
});
