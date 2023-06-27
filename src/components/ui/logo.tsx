import cn from 'classnames';
import { useSettings } from '@/utilities/settings';
import Image from 'next/image';
import { logoPlaceholder } from '@/lib/placeholders';
import Link from './link';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  }: any = useSettings();

  return (
    <Link href='/' className={cn('inline-flex', className)} {...props}>
      <span className='relative h-10 w-32 overflow-hidden md:w-40'>
        {/* <Image
          src={logo ?? logoPlaceholder}
          alt={siteTitle ?? 'Farm2door Express'}
          layout='fill'
          objectFit='contain'
          loading='eager'
        /> */}
        LOGO
      </span>
    </Link>
  );
};

export default Logo;
