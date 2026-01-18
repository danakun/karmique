export type FragranceType =
  | "stargazer"
  | "reign"
  | "luminara"
  | "electra"
  | "oracle";

export type AnswerOption = {
  text: string | null;
  value: FragranceType;
};

export type Vote = {
  Stargazer: number;
  Luminara: number;
  Electra: number;
  Reign: number;
  Oracle: number;
};

export type Votes = Vote[];

export type Winner = {
  fragranceType: FragranceType;
  title: string;
  uid: string | undefined;
};
