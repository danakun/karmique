import { Content } from "@prismicio/client";

type TypeData = {
  label: string;
};

const ENERGY_TYPE: Record<
  NonNullable<Content.FragranceDocumentData["energy_type"]>,
  TypeData
> = {
  Manifestor: {
    label: "Perfect for Manifestors",
  },
  Generator: {
    label: "Perfect for Generators",
  },
  "Mani-gen": {
    label: "Perfect for Mani-gens",
  },
  Projector: {
    label: "Perfect for Projectors",
  },
  Reflector: {
    label: "Perfect for Reflectors",
  },
};

type TypeProps = {
  energy_type: Content.FragranceDocumentData["energy_type"];
  className?: string;
};

export const Types = ({
  energy_type: providedEnergyType,
  className,
}: TypeProps) => {
  // Handle null/undefined or invalid energy types
  if (!providedEnergyType || !ENERGY_TYPE[providedEnergyType]) {
    return null; // or return a default UI
  }

  const energyType = ENERGY_TYPE[providedEnergyType];

  return (
    <div className={className}>
      <div className="mt-2 flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{energyType.label}</span>
        </div>
      </div>
    </div>
  );
};
