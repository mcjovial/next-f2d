import { useToken } from "@/lib/hooks/use-token";
import { useAuth } from "@/store/authorization-atom";
import { clearCheckoutAtom } from "@/store/checkout-atom";
import { useAtom } from "jotai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import client from "../client";
import { API_ENDPOINTS } from "../client/api-endpoints";
import { signOut as socialLoginSignOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

export function useUser() {
  const { isAuthorize: isAuthorized } = useAuth();
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
      onError: (err) => {
        console.log(err);
      },
    }
  );
  //TODO: do some improvement here
  return { me: data, isLoading, error, isAuthorized };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { setToken } = useToken();
  const { setAuthorized } = useAuth();
  const [_, resetCheckout] = useAtom(clearCheckoutAtom);

  const { mutate: signOut } = useMutation(client.users.logout, {
    onSuccess: (data) => {
      if (data) {
        setToken("");
        setAuthorized(false);
        // resetCheckout();
        queryClient.refetchQueries(API_ENDPOINTS.USERS_ME);
      }
    },
    onSettled: () => {
      queryClient.clear();
    },
  });

  function handleLogout() {
    socialLoginSignOut({ redirect: false });
    signOut();
  }
  return {
    mutate: handleLogout,
  };
}

export const useContact = () => {
  const { t } = useTranslation("common");

  return useMutation(client.users.contactUs, {
    onSuccess: (data) => {
      if (data.success) {
        toast.success(t(data.message));
      } else {
        toast.error(t(data.message));
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
