// types/vo2.ts
export type Sex = "M" | "F";

export interface VO2DataRow {
  age: number; 
  sex: Sex | string; 
  group?: string;
  vo2max_ml_kg_min: number; 
  bmi?: number; 
  hr_rest?: number;
}

export interface VO2Assessment {
  label: string;
  zone: "Low" | "Medium" | "High";
  baseline: number;
  percentageVsBaseline: number;
  zoneColor: string;
}

export interface VO2APIResponse {
  vo2max: number;
  sex: Sex;
  age: number;
  min: number;
  max: number;
  assessment: VO2Assessment;
  dataset: VO2DataRow[];
}

export interface VO2GaugeProps {
  data: VO2APIResponse | null;
  loading?: boolean;
  error?: string | null;
}

export interface VO2QueryParams {
  sex: Sex;
  age: number;
  vo2max: number;
  min: number;
  max: number;
}