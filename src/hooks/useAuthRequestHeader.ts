import { useAuth0 } from "@auth0/auth0-react";

export type AuthRequestHeader = {
  Authorization: string;
};

export const useAuthRequestHeader = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAuthRequestHeader = async (): Promise<AuthRequestHeader> => {
    const accessToken = await getAccessTokenSilently();
    return { Authorization: `Bearer ${accessToken}` };
  };

  return { getAuthRequestHeader };
};
