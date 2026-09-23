export interface CarInputSpecs {
  brand: string;
  vehicle_age: number;
  km_driven: number;
  seller_type: string;
  fuel_type: string;
  transmission_type: string;
  mileage: number;
  engine: number;
  max_power: number;
  seats: number;
}

export interface PresetCar extends CarInputSpecs {
  id: string;
  title: string;
  subtitle: string;
  actual_selling_price: number;
  is_ground_truth_test?: boolean;
}

export const PRESET_CARS: PresetCar[] = [
  {
    id: "step8_test_car",
    title: "2015 Hyundai Grand i10 (Step 8 Test Car)",
    subtitle: "Real dataset row #1 — Ground-truth sanity check benchmark",
    brand: "Hyundai",
    vehicle_age: 5,
    km_driven: 20000,
    seller_type: "Individual",
    fuel_type: "Petrol",
    transmission_type: "Manual",
    mileage: 18.9,
    engine: 1197,
    max_power: 82,
    seats: 5,
    actual_selling_price: 550000,
    is_ground_truth_test: true
  },
  {
    id: "maruti_swift_2018",
    title: "2018 Maruti Swift VXI",
    subtitle: "High-volume commuter hatchback with top resale demand",
    brand: "Maruti",
    vehicle_age: 3,
    km_driven: 35000,
    seller_type: "Dealer",
    fuel_type: "Petrol",
    transmission_type: "Manual",
    mileage: 22.0,
    engine: 1197,
    max_power: 81.8,
    seats: 5,
    actual_selling_price: 575000
  },
  {
    id: "honda_city_2015",
    title: "2015 Honda City i-VTEC",
    subtitle: "Executive family sedan with 1.5L petrol engine",
    brand: "Honda",
    vehicle_age: 6,
    km_driven: 50000,
    seller_type: "Individual",
    fuel_type: "Petrol",
    transmission_type: "Manual",
    mileage: 17.4,
    engine: 1497,
    max_power: 117.3,
    seats: 5,
    actual_selling_price: 750000
  },
  {
    id: "toyota_innova_2016",
    title: "2016 Toyota Innova 2.5G",
    subtitle: "8-seater rugged utility MPV with high residual retention",
    brand: "Toyota",
    vehicle_age: 5,
    km_driven: 120000,
    seller_type: "Individual",
    fuel_type: "Diesel",
    transmission_type: "Manual",
    mileage: 12.99,
    engine: 2494,
    max_power: 100.6,
    seats: 8,
    actual_selling_price: 950000
  },
  {
    id: "bmw_5_series_2016",
    title: "2016 BMW 5 Series 530d",
    subtitle: "High-horsepower 261 bhp German luxury executive sedan",
    brand: "BMW",
    vehicle_age: 5,
    km_driven: 63000,
    seller_type: "Dealer",
    fuel_type: "Diesel",
    transmission_type: "Automatic",
    mileage: 18.59,
    engine: 2993,
    max_power: 261.5,
    seats: 5,
    actual_selling_price: 2600000
  },
  {
    id: "maruti_alto_2012",
    title: "2012 Maruti Alto K10",
    subtitle: "Ultra-compact entry commuter, 1L engine, high mileage",
    brand: "Maruti",
    vehicle_age: 9,
    km_driven: 37000,
    seller_type: "Individual",
    fuel_type: "Petrol",
    transmission_type: "Manual",
    mileage: 20.92,
    engine: 998,
    max_power: 67.1,
    seats: 5,
    actual_selling_price: 226000
  }
];
