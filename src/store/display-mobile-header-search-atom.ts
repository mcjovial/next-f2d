import { atom, useAtom } from 'jotai';

export const displayMobileHeaderSearchAtom = atom(false);

export function useMobileHeaderSearch() {
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);

  return {
    displayMobileHeaderSearch
  };
};
