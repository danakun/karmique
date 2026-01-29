import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Lazy } from "@/components/Lazy";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video: FC<VideoProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-0 mb-20 w-full"
    >
      <h2 className="sr-only">Karmique Video</h2>
      <Lazy
        rootMargin="5000px"
        className="relative h-[70vh] w-full overflow-hidden md:aspect-video md:h-auto"
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${slice.primary.youtube_video_id}?autoplay=1&mute=1&loop=1&playlist=${slice.primary.youtube_video_id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-[100%] w-[100vw] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
        />
      </Lazy>
    </section>
  );
};

export default Video;
