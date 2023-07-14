import cn from 'classnames';
import { Swiper, SwiperSlide, Navigation, Autoplay } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import Search from '@/components/ui/search/search';
import type { Banner } from '@/types';
import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useHeaderSearch } from '@/store/headers/header-search-atom';

interface BannerProps {
  banners?: Banner[] | undefined;
}

const BannerWithSearch: React.FC<BannerProps> = ({ banners }) => {
  const { showHeaderSearch, hideHeaderSearch } = useHeaderSearch();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      hideHeaderSearch();
      return;
    }
    if (intersection && !intersection.isIntersecting) {
      showHeaderSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return (
    <div
      className={cn('relative hidden lg:block')}
    >
      <div className="-z-1 overflow-hidden">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Navigation, Autoplay]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={cn('relative h-screen w-full')}
                >
                  <Image
                    className="h-full min-h-140 w-full"
                    src={banner.image ?? productPlaceholder}
                    alt={banner.title ?? ''}
                    // style={{ objectFit: "cover" }}
                    // width={1080}
                    // height={960}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 mt-8 flex w-full flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10',
                    )}
                  >
                    <h1
                      className={cn(
                        'text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl',
                      )}
                    >
                      {banner?.title}
                    </h1>
                    <p className="text-sm text-heading lg:text-base xl:text-lg">
                      {banner?.description}
                    </p>
                    <div className="w-full max-w-3xl" ref={intersectionRef}>
                      <Search label="search" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BannerWithSearch;
