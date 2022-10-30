import { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "@styles/pages/Home.module.scss";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      console.log(token);
    })();
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <h1>Hello Next.js</h1>
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          ログアウト
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>ログイン</button>
      )}
    </div>
  );
};

export default Home;
