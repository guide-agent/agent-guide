import Image from 'next/image';
import { withBasePath } from '@/lib/base-path';

type LogoProps = {
  className?: string;
};

/** 导航栏与站点图标共用的品牌标志。 */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={withBasePath('/logo.svg')}
      alt=""
      width={64}
      height={64}
      className={className}
      draggable={false}
      unoptimized
    />
  );
}
