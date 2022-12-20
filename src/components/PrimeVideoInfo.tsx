import { FC } from "react";
import styles from "@styles/components/PrimeVideoInfo.module.scss";
import { NextImage } from "./NextImage";
import Link from "next/link";
import useSwr from "swr";
import { leavingSoonVideoFactory } from "src/models/LeavingSoonVideo";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthRequestHeader } from "src/hooks/useAuthRequestHeader";
import { videoFactory } from "src/models/Video";

type PrimeVideoInfoProps = {
  closeModal: () => void;
  title: string;
  url: string;
  image: string;
  is_available: boolean;
};

const fetchIsLeavingSoon = (key: string): Promise<boolean> => {
  return leavingSoonVideoFactory().getIsLeavingSoon(key);
};

export const PrimeVideoInfo: FC<PrimeVideoInfoProps> = ({
  closeModal,
  title,
  url,
  image,
  is_available,
}) => {
  const { data: isLeavingSoon, error } = useSwr(title, fetchIsLeavingSoon);

  const { isAuthenticated } = useAuth0();

  const { getAuthRequestHeader } = useAuthRequestHeader();

  const register = async () => {
    if (!isAuthenticated) {
      alert("リスト登録をするにはログインが必要です");
      return;
    }

    try {
      const authRequestHeader = await getAuthRequestHeader();
      const requestBody = {
        title,
        url,
        image,
        is_available,
      };
      await videoFactory().createVideo(requestBody, authRequestHeader);

      closeModal();
    } catch (e) {
      console.log(e);
      alert("登録に失敗しました");
    }
  };

  if (typeof isLeavingSoon === "undefined")
    return <div className={styles.title}>データ取得中</div>;

  if (error) return <div className={styles.title}>エラー</div>;

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
          <button className={styles.registerButton} onClick={register}>
            リストへ登録
          </button>
          <div className={styles.description}>
            配信終了予定になるとメールでお知らせします
          </div>
        </div>
      </div>
    </div>
  );
};
