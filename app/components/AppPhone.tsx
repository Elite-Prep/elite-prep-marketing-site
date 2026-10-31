import Image from "next/image";

/* Screenshots are 804 x 1748, cropped from the iPhone simulator. */
const SHOT_WIDTH = 804;
const SHOT_HEIGHT = 1748;

interface AppPhoneProps {
  src: string;
  alt: string;
  /** Size hint for the image optimizer, as a CSS `sizes` value. */
  sizes: string;
  priority?: boolean;
}

export default function AppPhone({ src, alt, sizes, priority = false }: AppPhoneProps) {
  return (
    <div className="ep-phone">
      <Image src={src} alt={alt} width={SHOT_WIDTH} height={SHOT_HEIGHT} sizes={sizes} priority={priority} />
    </div>
  );
}
