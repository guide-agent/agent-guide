import Image from 'next/image';

type LogoProps = {
  className?: string;
};

/** 导航栏与站点图标共用的品牌标志。 */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={64}
      height={64}
      className={className}
      draggable={false}
      unoptimized
    />
  );
}
