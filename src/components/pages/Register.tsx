import { FC, FormEvent, useState, MouseEvent, useCallback, memo } from "react";
import { Layout } from "../Layout";
import styles from "@styles/pages/Register.module.scss";
import Image from "next/image";
import { NextImage } from "../NextImage";
import { PrimeVideo, primeVideoFactory } from "src/models/PrimeVideo";
import { Modal } from "../Modal";
import { PrimeVideoInfo } from "../PrimeVideoInfo";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetchLeavingSoonVideos } from "src/hooks/useFetchLeavingSoonVideos";

export const Register: FC = () => {
  const { leavingSoonVideos } = useFetchLeavingSoonVideos();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [primeVideos, setPrimeVideos] = useState<PrimeVideo[]>();

  const [isLoading, setIsLoading] = useState(false);

  const searchVideo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) alert("作品タイトルを入力してください");

    setIsLoading(true);

    const primeVideoData = await primeVideoFactory().searchVideos({
      keyword: searchKeyword,
    });
    setPrimeVideos(primeVideoData);

    setIsLoading(false);
  };

  return (
    <Layout>
      <h1 className={styles.title}>リスト登録</h1>
      <form onSubmit={searchVideo}>
        <div className={styles.inputDesc}>作品名を入力して検索してください</div>
        <div className={styles.searchInputContainer}>
          <Image
            src="/magnifying-glass.svg"
            alt="magnifying-glass-icon"
            width={13}
            height={13}
            className={styles.magnifyingGlassIcon}
          />
          <input
            type="text"
            className={styles.searchInput}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </form>
      <div className={styles.searchResults}>
        {isLoading && <SkeletonVideoCards />}
        {primeVideos &&
          primeVideos.map((video, index) => (
            <VideoCard
              key={`${video.title}-${index}`}
              video={video}
              leavingSoonVideos={leavingSoonVideos}
            />
          ))}
      </div>
    </Layout>
  );
};

type VideoCardProps = {
  video: PrimeVideo;
  leavingSoonVideos?: string[];
};

const VideoCard: FC<VideoCardProps> = memo(({ video, leavingSoonVideos }) => {
  const { title, image, url, is_available } = video;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);
  const closeModalByOutClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.target === e.currentTarget) {
        setIsOpenModal(false);
      }
    },
    [],
  );

  return (
    <>
      <div
        className={styles.videoImageContainer}
        onClick={() => setIsOpenModal(true)}
      >
        <div className={styles.videoImage}>
          <NextImage src={image} alt={title} />
        </div>
        <div className={styles.videoTitle}>{title}</div>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModalByOutClick}>
          <PrimeVideoInfo
            title={title}
            url={url}
            image={image}
            is_available={is_available}
            closeModal={closeModal}
            leavingSoonVideos={leavingSoonVideos}
          />
        </Modal>
      )}
    </>
  );
});

const SkeletonVideoCards: FC = memo(() => {
  return (
    <SkeletonTheme baseColor="#222222" highlightColor="#333333">
      {[...Array(16)].map((_, index) => (
        <div key={index} className={styles.videoImageContainer}>
          <Skeleton className={styles.videoImage} />
          <div className={styles.videoTitle}>
            <Skeleton />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
});
