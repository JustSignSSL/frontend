import config from "../../config.json";

export const businessCategory = ["Private Organization", "Government Entity"];

export const validityPeriod = [7, 14, 30, 90, 180, 365, 396];

export const signatureHashingAlgorithm = ["SHA256", "SHA384", "SHA512"];

export const CAName = (key: CAType) => config.CAName[key]

export type CAType = "DV" | "OV" | "EV"