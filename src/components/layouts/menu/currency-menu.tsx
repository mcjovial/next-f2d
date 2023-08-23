import Scrollbar from '@/components/ui/scrollbar';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Link from '@/components/ui/link';
import { useSettings } from '@/utilities/queries/settings';
import { useCurrency } from '@/store/currency/currency.context';
import { LangSwitcherIcon } from '@/components/icons/lang-switcher-icon';

type Currency = {
  id?: number;
  name: string;
  code: string;
}

interface GroupsMenuProps {
  className?: string;
  currencies?: Currency[];
  defaultCurrency: Currency;
}

const GroupsMenu: React.FC<GroupsMenuProps> = ({
  className,
  currencies,
  defaultCurrency
}) => {
  const router = useRouter();
  const selectedMenu =
    currencies?.find((currency) => router.asPath.includes(currency?.code)) ?? defaultCurrency;
  
    const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleClick = (e: MouseEvent<HTMLButtonElement>, currencyCode: string) => {
    e.preventDefault();
    // setSelectedCurrency(currencyCode);
    const currentPath = router.asPath;
    const newPath = currentPath.includes('currency')
      ? currentPath.replace(/currency=[A-Z]+/, `currency=${currencyCode}`)
      : `${currentPath}${currentPath.includes('?') ? '&' : '?'}currency=${currencyCode}`;
    router.push(newPath);
    // window.location.href = newPath;
  };

  return (
    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right"
    >
      <Menu.Button
        className={cn(
          'flex h-10 shrink-0 items-center text-sm font-semibold text-heading focus:outline-none md:text-base xl:px-3',
          className
        )}
      >
        {() => (
          <>
            <span className="whitespace-nowrap ltr:mr-7 rtl:ml-6">{selectedMenu?.code}</span>
            <span className="pointer-events-none absolute inset-y-0 hidden items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2 xl:flex mx-2">
              <LangSwitcherIcon className="text-gray-400" aria-hidden="true" />
            </span>
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            'absolute mt-2 h-56 max-h-56 min-h-40 w-48 overflow-hidden rounded bg-light py-2 shadow-700 focus:outline-none sm:max-h-72 lg:h-72 2xl:h-auto 2xl:max-h-screen',
          )}
        >
          <Scrollbar
            className="h-full w-full"
            options={{
              scrollbars: {
                autoHide: 'never',
              },
            }}
          >
            {currencies?.map(({ id, name, code }) => (
              <Menu.Item key={id}>
                {({ active }) => (
                  // FIX: Add ref to Link component
                  <div>
                    <button
                      type='button'
                      onClick={(e) => handleClick(e, code)}
                      className={cn(
                        'flex w-full items-center space-x-4 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                        active ? 'text-accent' : 'text-body-dark'
                      )}
                    >
                      <span>{name}</span>
                    </button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Scrollbar>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const CurrencyDropdownMenu: React.FC = () => {
  const {
    // @ts-ignore
    settings: { currencies },
  } = useSettings();

  const defaultCurrency = { name: 'Nigerian naira', code: 'NGN'}
  return (
    <GroupsMenu currencies={currencies} defaultCurrency={defaultCurrency} className='border rounded-md'/>
  );
};

export default CurrencyDropdownMenu;
