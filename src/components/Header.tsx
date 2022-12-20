import { FC, useEffect } from "react";
import styles from "@styles/components/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { userFactory } from "src/models/User";

export const Header: FC = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !user) return;
      if (!user.sub || !user.email) return;
      const token = await getAccessTokenSilently();
      console.log(token);

      try {
        const userData = await userFactory().findById(user.sub);

        if (!userData) {
          const params = {
            id: user.sub,
            mail: user.email,
          };
          await userFactory().createUser(params);
        }
      } catch {
        console.log("error");
      }
    })();
  }, [isAuthenticated]);

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <Link href="/" className={styles.titleLink}>
            <Image src="/bell.svg" width={24} height={24} alt="bell-icon" />
            <span>Prime Video Notice</span>
          </Link>
        </div>
        <div className={styles.navContainer}>
          <nav>
            <ul>
              <li>
                <Link href="/register">リスト登録</Link>
              </li>
              <li>
                <Link href="/notice_list">リスト表示</Link>
              </li>
            </ul>
          </nav>
          {isAuthenticated ? (
            <button
              className={styles.authButton}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <div className={styles.authButtonLeft}>
                <div className={styles.userIcon}>
                  <Image
                    src="/user.svg"
                    width={14}
                    height={14}
                    alt="user-icon"
                  />
                </div>
                <span>ログアウト</span>
              </div>
              <Image
                src="/angle-right.svg"
                width={6}
                height={14}
                alt="angle-right-icon"
              />
            </button>
          ) : (
            <button
              className={styles.authButton}
              onClick={() => loginWithRedirect()}
            >
              <div className={styles.authButtonLeft}>
                <div className={styles.userIcon}>
                  <Image
                    src="/user.svg"
                    width={14}
                    height={14}
                    alt="user-icon"
                  />
                </div>
                <span>ログイン</span>
              </div>
              <Image
                src="/angle-right.svg"
                width={6}
                height={14}
                alt="angle-right-icon"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
