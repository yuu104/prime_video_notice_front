import { FC } from "react";
import { Layout } from "../Layout";
import styles from "@styles/components/Register.module.scss";

export const Register: FC = () => {
  return (
    <Layout>
      <h1 className={styles.title}>リスト登録</h1>
      <form>
        <div>作品名を入力して検索してください</div>
        <div>
          <input type="text" />
        </div>
      </form>
      <div></div>
    </Layout>
  );
};

const VideoCard: FC = () => {
  return <div></div>;
};
