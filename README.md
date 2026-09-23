# AutoValuator — Used Car Price Prediction & Valuation Desk

A production-grade machine learning appraisal web application built for BE Machine Learning Lab Mini Project. The system formulates used car resale valuation as a multi-variable **regression problem**, benchmarked across 5 fundamental learning algorithms trained on the CarDekho dataset.

---

## 1. Ground Truth Results Matrix

Evaluated on an 80/20 train/test split (`random_state=42`, regression without stratification):

| Model | R² Score | MAE (₹) | RMSE (₹) | Role / Key Finding |
|---|---|---|---|---|
| **Random Forest Regressor** | **0.8790** | **₹1,05,480** | **₹3,13,403** | **Best Model (Live Appraisal Engine)** |
| Decision Tree Regressor | 0.8587 | ₹1,19,489 | ₹3,38,604 | max_depth=10 |
| SVR (RBF Kernel, X+y scaled) | 0.6898 | ₹1,23,463 | ₹5,01,736 | Dual StandardScaler required |
| Linear Regression | 0.6360 | ₹2,59,358 | ₹5,43,442 | Standard OLS baseline |
| AdaBoost Regressor | 0.4589 | ₹5,52,061 | ₹6,62,648 | Outlier-sensitive failure |

### Critical Empirical Findings for Viva Voce:
1. **AdaBoost Underperformance (R² = 0.4589)**: AdaBoost's loss function iteratively amplifies sample weights for high-residual outliers. Because the target `selling_price` is heavily right-skewed (reaching ₹3.95 Crore) and `km_driven` features extreme outliers (> 3.8M km), boosting concentrates attention on luxury outliers rather than fitting the typical median car well.
2. **SVR Target Scaling Requirement**: SVR is distance-based; with target values spanning ₹40,000 to ₹3.95 Crore, training on unscaled `y` produces a *negative R²*. Fitting a `StandardScaler` on `y_train.values.reshape(-1, 1)` and inverse transforming predictions before scoring was mandatory.
3. **Random Forest Dominance**: Random Forest is unaffected by monotonic scaling, partitions multi-dimensional feature space locally, and achieves the highest R² (0.8790) and lowest error.

---

## 2. Feature Importance Ranking (Random Forest)

1. `max_power`: **0.635** (63.5%) — Dominant predictor by a wide margin. Horsepower dictates vehicle class and invoice MSRP.
2. `mileage`: **0.127** (12.7%) — Differentiates high-km/l economy commuters from low-km/l luxury cars.
3. `vehicle_age`: **0.127** (12.7%) — Exponential annual depreciation decay.
4. `km_driven`: **0.066** (6.6%) — Mechanical wear and odometer mileage.
5. `engine`: **0.024** (2.4%) — Cylinder capacity (cc).
6. `brand`: **0.012** (1.2%) — Prestige tier markup.
7. `transmission_type`: **0.003** (0.3%) — Automatic transmission resale premium.
8. `seats`: **0.003** (0.3%) — Utility MPV/SUV capacity.
9. `fuel_type`: **0.002** (0.2%) — Fuel category.
10. `seller_type`: **0.002** (0.2%) — Dealer vs. Individual sales channel.

---

## 3. Data Cleaning Pipeline

- **Raw Corpus**: 15,411 rows, 13 features, 0 missing values.
- **Deduplication**: 167 exact duplicate records removed.
- **Invalid Records**: Removed rows with `seats == 0` (unphysical recording error).
- **Brand Casing Normalization**: Stripped whitespace and replaced `ISUZU` → `Isuzu` to prevent category fragmentation.
- **Feature Selection**: Dropped `car_name` (redundant) and `model` (excessive unique cardinality of hundreds of classes that causes overfitting in small tabular datasets).
- **Cleaned Corpus**: **15,242 rows**.

---

## 4. Feature Vector Specification

Trained feature vector order (10 dimensions, strictly unscaled for Random Forest):
```python
feature_cols = [
    "brand_enc",          # 0: Label encoded brand (31 classes)
    "vehicle_age",        # 1: 0 - 29 years
    "km_driven",          # 2: 100 - 3,800,000 km
    "seller_enc",         # 3: Label encoded seller_type (3 classes)
    "fuel_enc",           # 4: Label encoded fuel_type (5 classes)
    "trans_enc",          # 5: Label encoded transmission_type (2 classes)
    "mileage",            # 6: Fuel economy (km/l or km/kg)
    "engine",             # 7: Displacement (cc)
    "max_power",          # 8: Brake horsepower (bhp)
    "seats"               # 9: Seating capacity (2 - 9)
]
```

---

## 5. Design System

- **Palette**: Modern dealership appraisal desk / precision telemetry system.
  - `--charcoal`: `#17181C` (deep automotive dark background)
  - `--paper`: `#F4F3F0` (warm white surface)
  - `--signal-value`: `#1E6E4F` (deep emerald valuation confirmed accent)
  - `--accent-blue`: `#0284C7` / `#38BDF8` (precision electric cerulean & sky blue for telemetry accents, buttons, and gauges)
  - `--accent-chrome`: `#9A9E9F` (metallic trim)
- **Typography**:
  - Headings: `Fraunces` (Google Fonts, serif)
  - Price Numerals & Tabular Data: `IBM Plex Mono` (Google Fonts, tabular figures)
  - UI Copy, Labels, and Buttons: `Inter` (Google Fonts, sans-serif)
- **Motif**: Spec-sheet gauge-tick divider rule with millimeter ticks.
- **Currency**: Indian lakh/crore comma grouping (e.g. `₹5,50,000`, `₹12,50,000`, `₹1,05,480`).

---

## 6. Local Setup & Execution

### Node.js / Web Application:
```bash
npm install
npm run build
npm run dev
```

### Python / Django Training Pipeline Reproduction (if running Django environment):
```bash
pip install -r requirements.txt
python valuator/ml/train_models.py
python manage.py runserver
```
