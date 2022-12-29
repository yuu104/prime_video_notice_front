import { NextPage } from "next";
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import "../styles/globals.scss";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
      audience={process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!}
      redirectUri={process.env["NEXT_PUBLIC_BASE_URL"]}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
