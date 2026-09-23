import React from 'react';
import metricsData from '../ml/metrics.json';
import { SpecSheetDivider } from './SpecSheetDivider.tsx';
import { FileSpreadsheet, Filter, CheckCircle2, Code2, Database, AlertCircle, BookCheck } from 'lucide-react';

export const LabReportView: React.FC = () => {
  const { dataset_summary } = metricsData;

  return (
    <div className="w-full text-left">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-[0.2em] text-[#38BDF8] uppercase">
            BE MACHINE LEARNING LAB // PROJECT SPECIFICATION
          </span>
          <span className="text-[#8C8F94]">·</span>
          <span className="text-xs text-[#8C8F94] font-mono">REGRESSION PIPELINE</span>
        </div>
        <h1 className="font-serif-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F3F0] mb-3">
          Dataset Cleaning & Laboratory Methodology
        </h1>
        <p className="text-sm sm:text-base text-[#8C8F94] max-w-3xl leading-relaxed">
          Complete documentation of raw data hygiene, exploratory target distribution analysis,
          feature reduction rationale, and scikit-learn pipeline reproduction for viva examination defense.
        </p>
      </div>

      {/* 4-Card Data Cleaning Step Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1C1E23] p-5 rounded-sm border border-[rgba(244,243,240,0.08)]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-[#8C8F94]">STEP 1: RAW INGESTION</span>
            <Database className="w-4 h-4 text-[#9A9E9F]" />
          </div>
          <div className="font-mono-plex text-3xl font-bold text-[#F4F3F0] mb-1">
            {dataset_summary.raw_rows.toLocaleString()}
          </div>
          <p className="text-xs text-[#8C8F94]">
            Total raw observations in <code className="text-[#38BDF8]">cardekho_dataset.csv</code> (13 columns, 0 missing values).
          </p>
        </div>

        <div className="bg-[#1C1E23] p-5 rounded-sm border border-[rgba(244,243,240,0.08)]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-red-400">STEP 2: DEDUPLICATION</span>
            <Filter className="w-4 h-4 text-red-400" />
          </div>
          <div className="font-mono-plex text-3xl font-bold text-red-400 mb-1">
            -{dataset_summary.duplicates_dropped}
          </div>
          <p className="text-xs text-[#8C8F94]">
            Duplicate rows identified and purged via <code className="text-[#F4F3F0]">df.drop_duplicates()</code>.
          </p>
        </div>

        <div className="bg-[#1C1E23] p-5 rounded-sm border border-[rgba(244,243,240,0.08)]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-[#38BDF8]">STEP 3: INVALID VALUES</span>
            <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="font-mono-plex text-3xl font-bold text-[#38BDF8] mb-1">
            seats &gt; 0
          </div>
          <p className="text-xs text-[#8C8F94]">
            Dropped rows with <code className="text-[#F4F3F0]">seats == 0</code> (unphysical recording errors; cars cannot have 0 seats).
          </p>
        </div>

        <div className="bg-[#1C1E23] p-5 rounded-sm border border-[rgba(244,243,240,0.08)]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-[#1E6E4F]">STEP 4: FINAL CLEAN CORPUS</span>
            <CheckCircle2 className="w-4 h-4 text-[#1E6E4F]" />
          </div>
          <div className="font-mono-plex text-3xl font-bold text-[#1E6E4F] mb-1">
            {dataset_summary.clean_rows.toLocaleString()}
          </div>
          <p className="text-xs text-[#8C8F94]">
            Clean observations ready for modeling after &quot;ISUZU&quot; → &quot;Isuzu&quot; casing normalization.
          </p>
        </div>
      </div>

      {/* Deep-Dive Technical Explanation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Card 1: Data Cleaning Details */}
        <div className="bg-[#1C1E23] p-6 rounded-sm border border-[rgba(244,243,240,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <FileSpreadsheet className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0]">
              Cleaning Methodology (Grounded Truth)
            </h2>
          </div>
          <div className="space-y-3.5 text-xs text-[#8C8F94] leading-relaxed">
            <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)]">
              <strong className="text-[#F4F3F0] block mb-1">1. Exact Deduplication (167 Rows)</strong>
              <span>Multiple identical dealer listings were removed to prevent test set data leakage and artificial variance deflation.</span>
            </div>

            <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)]">
              <strong className="text-[#F4F3F0] block mb-1">2. Domain Invalidity Removal (seats == 0)</strong>
              <span>A vehicle must accommodate passengers. Observations with 0 seats represent bad scraping data rather than legitimate classes.</span>
            </div>

            <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)]">
              <strong className="text-[#F4F3F0] block mb-1">3. Brand Casing Normalization (&quot;ISUZU&quot; → &quot;Isuzu&quot;)</strong>
              <span>Without normalization, categorical encoders allocate separate integer indexes to &quot;ISUZU&quot; and &quot;Isuzu&quot;, fracturing sample support.</span>
            </div>

            <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)]">
              <strong className="text-[#F4F3F0] block mb-1">4. Feature Elimination (car_name, model)</strong>
              <span><code className="text-[#38BDF8]">car_name</code> is redundant with brand + model. <code className="text-[#38BDF8]">model</code> contains hundreds of high-cardinality unique values that induce severe overfitting in small tabular datasets.</span>
            </div>
          </div>
        </div>

        {/* Card 2: Target Distribution Analysis */}
        <div className="bg-[#1C1E23] p-6 rounded-sm border border-[rgba(244,243,240,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0]">
              Target Skew & Outlier Impact
            </h2>
          </div>
          <p className="text-xs text-[#8C8F94] leading-relaxed mb-4">
            The target variable <code className="text-[#38BDF8]">selling_price</code> is heavily right-skewed.
            While the median car trades at ₹5.56 Lakh and the mean is ₹7.75 Lakh, luxury exotics extend to ₹3.95 Crore.
          </p>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between p-2 bg-[#17181C] rounded">
              <span className="text-[#8C8F94]">Target Median:</span>
              <span className="text-[#F4F3F0] font-bold">₹5,56,000 (₹5.56 Lakh)</span>
            </div>
            <div className="flex justify-between p-2 bg-[#17181C] rounded">
              <span className="text-[#8C8F94]">Target Mean:</span>
              <span className="text-[#F4F3F0] font-bold">₹7,75,000 (₹7.75 Lakh)</span>
            </div>
            <div className="flex justify-between p-2 bg-[#17181C] rounded">
              <span className="text-[#8C8F94]">Target Max (Luxury Exotic):</span>
              <span className="text-[#38BDF8] font-bold">₹3,95,00,000 (₹3.95 Crore)</span>
            </div>
            <div className="flex justify-between p-2 bg-[#17181C] rounded">
              <span className="text-[#8C8F94]">Target Min:</span>
              <span className="text-[#8C8F94]">₹40,000</span>
            </div>
            <div className="flex justify-between p-2 bg-[#17181C] rounded">
              <span className="text-[#8C8F94]">Split Strategy:</span>
              <span className="text-[#1E6E4F]">80/20 train/test (no stratify — continuous target)</span>
            </div>
          </div>

          <p className="text-[11px] text-[#8C8F94] mt-4 leading-relaxed italic">
            This skew explains why algorithms like AdaBoost fail (re-weighting extreme residual outliers)
            and why tree ensembles like Random Forest excel (partitioning spaces locally without global squared-loss distortion).
          </p>
        </div>
      </div>

      <SpecSheetDivider label="PYTHON & SCIKIT-LEARN PIPELINE REPRODUCTION" />

      {/* Code Snippet of the exact Python training pipeline */}
      <div className="bg-[#141518] p-6 rounded-sm border border-[rgba(244,243,240,0.1)] mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#38BDF8]">
            <Code2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">train_models.py (Exact Python Code)</span>
          </div>
          <span className="text-[#8C8F94]">scikit-learn 1.3+ / pandas</span>
        </div>

        <pre className="p-4 bg-[#0F1012] rounded text-[11px] font-mono text-[#E8E6E1] overflow-x-auto leading-relaxed border border-[rgba(244,243,240,0.06)]">
{`# 1. Hygiene & Normalization
df = pd.read_csv("cardekho_dataset.csv", index_col=0)
df = df.drop_duplicates()
df = df[df["seats"] > 0]
df["brand"] = df["brand"].str.strip().replace({"ISUZU": "Isuzu"})
df_model = df.drop(columns=["car_name", "model"])

# 2. Label Encoding (Alphabetic Classes)
le_brand  = LabelEncoder()
le_seller = LabelEncoder()
le_fuel   = LabelEncoder()
le_trans  = LabelEncoder()

df_model["brand_enc"]  = le_brand.fit_transform(df_model["brand"])
df_model["seller_enc"] = le_seller.fit_transform(df_model["seller_type"])
df_model["fuel_enc"]   = le_fuel.fit_transform(df_model["fuel_type"])
df_model["trans_enc"]  = le_trans.fit_transform(df_model["transmission_type"])

# 3. Exact Feature Ordering
feature_cols = ["brand_enc", "vehicle_age", "km_driven", "seller_enc",
                "fuel_enc", "trans_enc", "mileage", "engine", "max_power", "seats"]
X = df_model[feature_cols]
y = df_model["selling_price"]

# 4. Regression Split (no stratify)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

# 5. Model Architecture Specifications
lr_model  = LinearRegression()
dt_model  = DecisionTreeRegressor(max_depth=10, random_state=42)
rf_model  = RandomForestRegressor(n_estimators=100, random_state=42)
ada_model = AdaBoostRegressor(n_estimators=100, random_state=42)

# Note: SVR requires separate scaler on y reshaped to 2D
scaler_X  = StandardScaler()
scaler_y  = StandardScaler()
X_tr_sc   = scaler_X.fit_transform(X_train)
y_tr_sc   = scaler_y.fit_transform(y_train.values.reshape(-1, 1)).ravel()
svr_model = SVR(kernel="rbf").fit(X_tr_sc, y_tr_sc)`}
        </pre>
      </div>

      {/* Viva Voce Quick Cheat Sheet */}
      <div className="bg-[#1C1E23] p-6 rounded-sm border border-[rgba(244,243,240,0.1)]">
        <div className="flex items-center gap-2 mb-3 text-[#38BDF8]">
          <BookCheck className="w-4 h-4" />
          <h3 className="font-serif-fraunces text-lg font-bold text-[#F4F3F0]">
            Viva Voce Defense Cheat Sheet
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.06)]">
            <span className="text-[#38BDF8] font-bold block mb-1">Q1: Why unscaled Random Forest?</span>
            <p className="text-[#8C8F94] font-sans">
              Tree split criteria (MSE reduction) only depend on rank order of values, not distance. Scaling does not change decision boundaries.
            </p>
          </div>
          <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.06)]">
            <span className="text-[#38BDF8] font-bold block mb-1">Q2: Why did AdaBoost perform worst?</span>
            <p className="text-[#8C8F94] font-sans">
              AdaBoost repeatedly amplifies weights on high-residual outliers (crore luxury cars and million km odometers), sacrificing fit for normal cars.
            </p>
          </div>
          <div className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.06)]">
            <span className="text-[#38BDF8] font-bold block mb-1">Q3: Why report MAE with price?</span>
            <p className="text-[#8C8F94] font-sans">
              Regression outputs continuous point estimates. A stated margin of error communicates the true ±₹1,05,480 confidence bound.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
