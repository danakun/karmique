import { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";

// Human Design types mapping - 5 TYPES
const HUMAN_DESIGN_TYPES = {
  generator: ["generator", "generators", "gen"],
  "mani-gen": [
    "mani-gen",
    "mani",
    "mani gen",
    "manifesting generator",
    "manifesting-generator",
    "manigen",
    "mani-gens",
  ],
  manifestor: ["manifestor", "manifestors"],
  projector: ["projector", "projectors"],
  reflector: ["reflector", "reflectors"],
};

// Common fragrance note keywords
const FRAGRANCE_NOTES = {
  floral: [
    "rose",
    "jasmine",
    "lily",
    "lotus",
    "peony",
    "violet",
    "lavender",
    "floral",
    "iris",
    "white flowers",
  ],
  citrus: ["lemon", "orange", "bergamot", "grapefruit", "lime", "citrus"],
  woody: [
    "cedar",
    "sandalwood",
    "oud",
    "vetiver",
    "wood",
    "woody",
    "cashmere wood",
  ],
  spicy: [
    "pepper",
    "black pepper",
    "cinnamon",
    "cardamom",
    "ginger",
    "spice",
    "spicy",
  ],
  fresh: ["aquatic", "marine", "oceanic", "water", "fresh", "clean"],
  oriental: ["amber", "musk", "incense", "vanilla", "oriental"],
  leather: ["leather", "suede", "tobacco", "leather accord"],
  green: ["green", "herbal", "leafy", "grass", "sage"],
  lunar: ["lunar", "moon", "lunar musk"],
  crystalline: ["crystalline", "crystal"],
  fruity: ["grapes", "grape", "fruity"],
  mineral: ["pyrite"],
};

// Mood keywords
const MOOD_KEYWORDS = {
  energetic: [
    "vibrant",
    "energizing",
    "dynamic",
    "lively",
    "electric",
    "multi-passionate",
    "dynamo",
  ],
  calm: ["calming", "peaceful", "serene", "tranquil", "soothing"],
  mysterious: ["mysterious", "enigmatic", "deep", "dark", "rare", "magic"],
  fresh: ["fresh", "clean", "crisp", "light"],
  sensual: ["sensual", "warm", "intimate", "seductive"],
  powerful: ["powerful", "bold", "strong", "intense"],
  wise: ["wise", "intuitive", "knowing"],
  radiant: ["radiant", "radiating", "magnetic", "vitality"],
};

type FragranceWithScore = {
  fragrance: Content.FragranceDocument;
  score: number;
  matchReasons: string[];
};

export function matchFragrances(
  query: string,
  fragrances: Content.FragranceDocument[],
): Content.FragranceDocument[] {
  const searchTerm = query.toLowerCase().trim();

  // Score each fragrance
  const scoredFragrances: FragranceWithScore[] = fragrances.map((fragrance) => {
    let score = 0;
    const matchReasons: string[] = [];

    const title = asText(fragrance.data.title).toLowerCase();
    const description = asText(fragrance.data.description).toLowerCase();
    const energyType = fragrance.data.energy_type?.toLowerCase() || "";
    const scentProfile = fragrance.data.scent_profile?.toLowerCase() || "";
    const mood = fragrance.data.mood?.toLowerCase() || "";

    // 1. Exact title match (highest priority)
    if (title === searchTerm) {
      score += 100;
      matchReasons.push("exact title match");
    }

    // 2. Title contains search term
    if (title.includes(searchTerm)) {
      score += 50;
      matchReasons.push("title match");
    }

    // 3. Human Design type match (CRITICAL - 5 types)
    for (const [type, variations] of Object.entries(HUMAN_DESIGN_TYPES)) {
      if (variations.some((v) => searchTerm.includes(v))) {
        // Check if fragrance energy_type matches
        if (
          energyType.includes(type) ||
          variations.some((v) => energyType.includes(v)) ||
          (type === "mani-gen" &&
            (energyType.includes("mani") ||
              energyType.includes("manifesting generator")))
        ) {
          score += 80;
          matchReasons.push(`perfect for ${type}s`);
        }
      }
    }

    // 4. Fragrance note match
    for (const [noteFamily, notes] of Object.entries(FRAGRANCE_NOTES)) {
      if (notes.some((note) => searchTerm.includes(note))) {
        // Check in scent profile
        if (notes.some((note) => scentProfile.includes(note))) {
          score += 60;
          matchReasons.push(`${noteFamily} notes`);
        }
        // Check in description
        if (notes.some((note) => description.includes(note))) {
          score += 40;
          matchReasons.push(`contains ${noteFamily}`);
        }
      }
    }

    // 5. Mood match
    for (const [moodType, keywords] of Object.entries(MOOD_KEYWORDS)) {
      if (keywords.some((kw) => searchTerm.includes(kw))) {
        if (
          mood.includes(moodType) ||
          keywords.some((kw) => mood.includes(kw))
        ) {
          score += 50;
          matchReasons.push(`${moodType} mood`);
        }
        if (keywords.some((kw) => description.includes(kw))) {
          score += 30;
          matchReasons.push(`${moodType} character`);
        }
      }
    }

    // 6. Description match (lower priority)
    if (description.includes(searchTerm)) {
      score += 20;
      matchReasons.push("description match");
    }

    // 7. Partial word matches (for typos or variations)
    const words = searchTerm.split(" ");
    words.forEach((word) => {
      if (word.length > 3) {
        if (title.includes(word)) score += 10;
        if (description.includes(word)) score += 5;
      }
    });

    return { fragrance, score, matchReasons };
  });

  // Filter out fragrances with no matches and sort by score
  return scoredFragrances
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.fragrance);
}
