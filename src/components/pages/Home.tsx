import { FC } from "react";
import { Layout } from "../Layout";
import { NextImage } from "../NextImage";
import styles from "@styles/pages/Home.module.scss";

export const Home: FC = () => {
  return (
    <Layout>
      <div className={styles.titleBox}>
        <h1>Amazon Prime Video の配信状況をメールで通知</h1>
        <div className={styles.description}>
          リスト登録した作品が配信終了予定になったときや、無料で閲覧可能になったときに通知します。
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionBox}>
          <div className={styles.imageContainer}>
            <NextImage src="/home-search.png" alt="home-search" />
          </div>
          <div className={styles.descContainer}>
            <h2 className={styles.descTitle}>作品を検索</h2>
            <div className={styles.description}>
              作品名を入力してリストに登録したい作品を検索します。
            </div>
          </div>
        </div>
        <div className={`${styles.sectionBox} ${styles.sectionBoxReverse}`}>
          <div className={styles.imageContainer}>
            <NextImage src="/home-register.png" alt="home-register" />
          </div>
          <div className={styles.descContainer}>
            <h2 className={styles.descTitle}>リストへ登録</h2>
            <div className={styles.description}>
              現在の配信状況を把握し、リストへ登録できます。
            </div>
          </div>
        </div>
        <div className={styles.sectionBox}>
          <div className={styles.imageContainer}>
            <NextImage src="/home-list.png" alt="home-list" />
          </div>
          <div className={styles.descContainer}>
            <h2 className={styles.descTitle}>リストを表示</h2>
            <div className={styles.description}>
              リストに登録した作品の一覧を確認できます。
              <br />
              メールで通知した作品はリストから削除されます。
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
