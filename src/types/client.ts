export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface DietEntry {
  id: string;
  date: string;
  meal: string;
  description: string;
  calories?: number;
  notes?: string;
}

export interface TrainingEntry {
  id: string;
  date: string;
  type: string;
  duration: number;
  exercises: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  profilePhoto?: string;
  createdAt: string;
  weights: WeightEntry[];
  medications: MedicationEntry[];
  diets: DietEntry[];
  trainings: TrainingEntry[];
}
