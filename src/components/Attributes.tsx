import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuAmphora,
  LuBird,
  LuCandy,
  LuCrown,
  LuFlame,
  LuFlower,
  LuGem,
  LuMoon,
  LuTreePine,
  LuTrendingUp,
} from "react-icons/lu";

type ATtributeData = {
  label: string;
  Icon: IconType;
};

const SCENT_PROFILES: Record<
  Content.FragranceDocumentData["scent_profile"],
  ATtributeData
> = {
  Woody: {
    label: "Woody and herbal",
    Icon: LuAmphora,
  },
  Fresh: {
    label: "Fresh and floral",
    Icon: LuFlower,
  },
  Vibrant: {
    label: "Vibrant and citrusy",
    Icon: LuTrendingUp,
  },
  Bold: {
    label: "White Howlite with Gold Veining",
    Icon: LuFlame,
  },
  Rare: {
    label: "Rare and mysterious",
    Icon: LuMoon,
  },
};

const MOODS: Record<Content.FragranceDocumentData["mood"], ATtributeData> = {
  Mystical: {
    label: "Mystical and spiritual",
    Icon: LuGem,
  },
  Wise: {
    label: "Wise and intuitive",
    Icon: LuBird,
  },
  Dynamic: {
    label: "Black pepper • Oud • Leather accord",
    Icon: LuCandy,
  },
  "Life-giving": {
    label: "Black pepper • Oud • Leather accord",
    Icon: LuTreePine,
  },
  Trailblazing: {
    label: "Black pepper • Oud • Leather accord",
    Icon: LuCrown,
  },
};

type AttributesProps = {
  scent_profile: Content.FragranceDocumentData["scent_profile"];
  mood: Content.FragranceDocumentData["mood"];
  className?: string;
};

export const Attributes = ({
  scent_profile: providedScentProfile,
  mood: providedMood,
  className,
}: AttributesProps) => {
  const scent_profile = SCENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];
  return (
    <div className={className}>
      <p className="font-regular navbar-section-title mt-9">Features</p>
      <div className="font-regular mt-1 flex flex-col gap-2 text-black">
        <div className="flex items-center gap-2">
          <scent_profile.Icon className="text-2xl" />
          <span className="body">{scent_profile.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <mood.Icon className="text-2xl" />
          <span className="body">{mood.label}</span>
        </div>
      </div>
    </div>
  );
};
