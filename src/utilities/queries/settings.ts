import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { API_ENDPOINTS } from "../client/api-endpoints";
import { Settings } from "@/types";
import client from "../client";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { getPreviewImage } from "@/lib/get-preview-image";
import { useTranslation } from "next-i18next";
import { couponAtom } from "@/store/checkout";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

export function useSettings() {
  const { locale } = useRouter();

  const formattedOptions = {
    language: locale,
  };

  const { data, isLoading, error } = useQuery<Settings, Error>(
    [API_ENDPOINTS.SETTINGS, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.settings.all(Object.assign({}, queryKey[1], pageParam))
  );

  return {
    settings: data?.options ?? {},
    isLoading,
    error,
  };
}

export function useSubscription() {
  let [isSubscribed, setIsSubscribed] = useState(false);

  const subscription = useMutation(client.users.subscribe, {
    onSuccess: () => {
      setIsSubscribed(true);
    },
    onError: () => {
      setIsSubscribed(false);
    },
  });

  return {
    ...subscription,
    isSubscribed,
  };
}

export const useUploads = ({ onChange, defaultFiles }: any) => {
  const [files, setFiles] = useState<FileWithPath[]>(
    getPreviewImage(defaultFiles)
  );

  const { mutate: upload, isLoading } = useMutation(client.settings.upload, {
    onSuccess: (data) => {

      if (onChange) {
        onChange(data);
        setFiles(getPreviewImage(data));
      }
    },
  });

  function handleSubmit(data: File[]) {
    upload(data);
  }

  return { mutate: handleSubmit, isLoading, files };
};

export function useVerifyCoupon() {
  const { t } = useTranslation();
  const [_, applyCoupon] = useAtom(couponAtom);
  let [formError, setFormError] = useState<any>(null);

  const { mutate, isLoading } = useMutation(client.coupons.verify, {
    onSuccess: (data:any) => {
      if (!data.is_valid) {
        setFormError({
          code: t('error-invalid-coupon'),
        });
      }
      applyCoupon(data?.coupon);
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}
