import * as React from "react";
import type { Img, ImageConfig } from "./types";

export interface SourceSetProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCase: Img;
  alt: string;
  lazy?: boolean;
  eager?: boolean;
  imgs: ImageConfig[];
  _img?: React.HTMLAttributes<HTMLImageElement>;
}

export function SourceSet({
  imgs,
  lazy = true,
  eager = false,
  defaultCase,
  _img,
  alt,
  className,
  ...props
}: SourceSetProps) {
  const sets = React.useMemo(() => buildNodesList(imgs), [imgs]);

  if (eager) lazy = false;

  return (
    <div {...props} className={`relative ${className || ""}`}>
      <picture>
        {sets}
        <img
          alt={alt}
          width={defaultCase.width}
          height={defaultCase.height}
          loading={lazy ? "lazy" : "eager"}
          src={defaultCase.src}
          {..._img}
        />
      </picture>
    </div>
  );
}

const buildNodesList = (imgs: ImageConfig[]) => {
  let max = 0;
  let min = 0;
  const sets: React.ReactNode[] = [];

  for (let i = 0; i < imgs.length; i++) {
    const formatSet = { max: imgs[i].max, formats: {} as Record<string, Img[]> };

    if (max > 0) min = max + 1;
    const newMax = imgs[i].max;
    max = newMax || 0;

    for (const img of imgs[i].image) {
      if (!formatSet.formats[img.format]) {
        formatSet.formats[img.format] = [];
      }
      formatSet.formats[img.format].push(img);
    }

    Object.values(formatSet.formats).forEach((format: Img[], index: number) => {
      const sourceProps: Record<string, string> = {
        type: `image/${format[0].format}`,
        srcSet:
          format.length > 1
            ? format.map((image: Img) => `${image.src} ${image.width}w`).join(", ")
            : format[0].src,
      };

      if (min || max) {
        sourceProps.media =
          `${min > 0 ? `(min-width: ${min}px)` : ""}` +
          `${min > 0 && max > 0 ? ` and ` : ""}` +
          `${max > 0 ? `(max-width: ${max}px)` : ""}`;
      }

      sets.push(<source key={`${format[0].format}-${index}-${i}`} {...sourceProps} />);
    });
  }

  return sets;
};
