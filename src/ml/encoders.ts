/**
 * Saved label encoders matching scikit-learn LabelEncoder() exactly.
 * In scikit-learn, LabelEncoder sorts unique classes in natural alphanumeric order.
 */

export interface LabelEncoderObj {
  name: string;
  classes_: readonly string[];
  transform: (value: string) => number;
  inverse_transform: (encoded: number) => string;
}

export const BRAND_CLASSES = [
  "Audi",
  "BMW",
  "Bentley",
  "Datsun",
  "Ferrari",
  "Force",
  "Ford",
  "Honda",
  "Hyundai",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "MG",
  "Mahindra",
  "Maruti",
  "Maserati",
  "Mercedes-AMG",
  "Mercedes-Benz",
  "Mini",
  "Nissan",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Skoda",
  "Tata",
  "Toyota",
  "Volkswagen",
  "Volvo"
] as const;

export const SELLER_CLASSES = [
  "Dealer",
  "Individual",
  "Trustmark Dealer"
] as const;

export const FUEL_CLASSES = [
  "CNG",
  "Diesel",
  "Electric",
  "LPG",
  "Petrol"
] as const;

export const TRANS_CLASSES = [
  "Automatic",
  "Manual"
] as const;

function createLabelEncoder(name: string, classes: readonly string[]): LabelEncoderObj {
  const map = new Map<string, number>();
  classes.forEach((cls, idx) => map.set(cls, idx));

  return {
    name,
    classes_: classes,
    transform: (value: string): number => {
      // Normalization check e.g. ISUZU -> Isuzu
      const normalized = value.trim() === "ISUZU" ? "Isuzu" : value.trim();
      const code = map.get(normalized);
      if (code !== undefined) return code;
      // Case-insensitive fallback
      const foundIdx = classes.findIndex(c => c.toLowerCase() === normalized.toLowerCase());
      return foundIdx >= 0 ? foundIdx : 0;
    },
    inverse_transform: (encoded: number): string => {
      return classes[encoded] || classes[0];
    }
  };
}

export const le_brand = createLabelEncoder("brand", BRAND_CLASSES);
export const le_seller = createLabelEncoder("seller_type", SELLER_CLASSES);
export const le_fuel = createLabelEncoder("fuel_type", FUEL_CLASSES);
export const le_trans = createLabelEncoder("transmission_type", TRANS_CLASSES);

export type BrandName = typeof BRAND_CLASSES[number];
export type SellerType = typeof SELLER_CLASSES[number];
export type FuelType = typeof FUEL_CLASSES[number];
export type TransmissionType = typeof TRANS_CLASSES[number];
