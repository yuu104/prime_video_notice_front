import { FC, memo } from "react";
import styles from "@styles/components/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

export const Header: FC = memo(() => {
  const { pathname } = useRouter();

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
              <li className={`${pathname === "/register" && styles.active}`}>
                <Link href="/register">リスト登録</Link>
              </li>
              <li className={`${pathname === "/notice_list" && styles.active}`}>
                <Link href="/notice_list">リスト表示</Link>
              </li>
            </ul>
          </nav>
          <AuthButton />
        </div>
      </div>
    </header>
  );
});

const AuthButton: FC = memo(() => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const LogoutButton = (
    <button
      className={styles.authButton}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      <div className={styles.authButtonLeft}>
        <div className={styles.userIcon}>
          <Image src="/user.svg" width={14} height={14} alt="user-icon" />
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
  );

  const LoginButton = (
    <button className={styles.authButton} onClick={() => loginWithRedirect()}>
      <div className={styles.authButtonLeft}>
        <div className={styles.userIcon}>
          <Image src="/user.svg" width={14} height={14} alt="user-icon" />
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
  );

  return isAuthenticated ? LogoutButton : LoginButton;
});
