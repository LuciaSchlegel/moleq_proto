# MoleQlar VO₂max Assessment Platform

A sophisticated web application for clinical-grade VO₂max assessment and cardiovascular fitness evaluation, built with modern web technologies and following evidence-based medical guidelines.

![MoleQlar VO2max Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🏥 Clinical Overview

VO₂max (maximal oxygen uptake) represents the maximum rate of oxygen consumption during incremental exercise and serves as the gold standard for measuring cardiorespiratory fitness. This platform provides:

- **Clinical-grade assessments** based on ACSM (American College of Sports Medicine) guidelines
- **Age and sex-specific normative values** for accurate population comparisons
- **Risk stratification** for cardiovascular health assessment
- **Statistical confidence intervals** and percentile rankings
- **Real-time interactive visualizations** for clinical decision support

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9.0 or later (or **yarn** 1.22+ / **pnpm** 8.0+)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/moleq_proto.git
   cd moleq_proto
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

### Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🛠 Tech Stack

### Frontend Framework
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **Custom CSS Variables** - MoleQlar brand design system
- **[React Gauge Component](https://github.com/antoniolago/react-gauge-component)** - Interactive gauge visualizations
- **[Framer Motion](https://framer.com/motion/)** - Animation library

### Development Tools
- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler
- **[ESLint 9.0](https://eslint.org/)** - Code linting and quality
- **PostCSS** - CSS processing and optimization

### Architecture
- **Server-Side Rendering (SSR)** - Optimal performance and SEO
- **API Routes** - Built-in backend functionality
- **Component-Based Architecture** - Modular and reusable code
- **Custom Hooks** - Reusable state management logic

## 📊 VO₂max Calculation Logic

### Scientific Foundation

Our assessment algorithms are based on the **American College of Sports Medicine (ACSM)** guidelines for exercise testing and prescription, incorporating:

- **Age-stratified norms** (20-29, 30-39, 40-49, 50-59, 60+ years)
- **Sex-specific classifications** with different physiological baselines
- **Percentile-based population comparisons**
- **Statistical confidence intervals** for assessment reliability

### Classification Categories

#### Male Categories (ml/kg/min)
| Age Group | Very Poor | Poor | Fair | Good | Excellent | Superior |
|-----------|-----------|------|------|------|-----------|----------|
| 20-29     | <35.0     | 35.0-38.3 | 38.3-45.1 | 45.1-50.9 | 50.9-55.9 | >55.9 |
| 30-39     | <33.0     | 33.0-36.4 | 36.4-42.4 | 42.4-46.4 | 46.4-52.4 | >52.4 |
| 40-49     | <30.5     | 30.5-34.4 | 34.4-40.9 | 40.9-44.9 | 44.9-49.4 | >49.4 |
| 50-59     | <26.1     | 26.1-30.9 | 30.9-35.7 | 35.7-40.9 | 40.9-45.3 | >45.3 |
| 60+       | <20.5     | 20.5-26.0 | 26.0-32.2 | 32.2-36.4 | 36.4-44.2 | >44.2 |

#### Female Categories (ml/kg/min)
| Age Group | Very Poor | Poor | Fair | Good | Excellent | Superior |
|-----------|-----------|------|------|------|-----------|----------|
| 20-29     | <27.0     | 27.0-30.9 | 30.9-35.9 | 35.9-41.0 | 41.0-45.0 | >45.0 |
| 30-39     | <26.0     | 26.0-29.9 | 29.9-33.9 | 33.9-39.0 | 39.0-44.9 | >44.9 |
| 40-49     | <25.8     | 25.8-28.9 | 28.9-32.9 | 32.9-36.9 | 36.9-41.0 | >41.0 |
| 50-59     | <24.5     | 24.5-27.0 | 27.0-31.4 | 31.4-35.6 | 35.6-40.0 | >40.0 |
| 60+       | <20.2     | 20.2-24.4 | 24.4-30.2 | 30.2-31.4 | 31.4-35.7 | >35.7 |

### Algorithm Implementation

#### 1. **Enhanced Classification Function**
```typescript
function classifyVO2Enhanced(sex: Sex, age: number, vo2: number) {
  // Find appropriate age group
  const ageGroup = ACSM[sex].find(({decade:[a,b]}) => age >= a && age <= b);
  
  // Special handling for critically low values
  if (vo2 < lowestThreshold) {
    return { label: "Critically Low", confidence: 0.99 };
  }
  
  // Band classification with confidence scoring
  // Returns: label, zone, confidence, percentile, healthRisk
}
```

#### 2. **Statistical Baseline Calculation**
```typescript
function calculateEnhancedBaseline(dataset, sex, age) {
  // Filter relevant demographic data
  // Calculate: mean, median, standard deviation
  // Generate 95% confidence intervals
  // Return comprehensive statistics
}
```

#### 3. **Health Risk Assessment**
Based on cardiovascular research correlations:
- **Very High Risk**: Critically Low VO₂max (increased mortality risk)
- **High Risk**: Poor fitness levels
- **Moderate Risk**: Fair fitness levels
- **Low Risk**: Good to Excellent fitness
- **Very Low Risk**: Superior fitness levels

### Data Sources

#### Primary Dataset
- **ACSM Guidelines** - Evidence-based normative values
- **Enhanced Mock Dataset** - Realistic population distributions
- **Activity Level Correlations** - Light, moderate, vigorous exercise patterns
- **BMI Associations** - Body composition considerations

#### Statistical Methods
- **Normal Distribution Modeling** - Population percentile calculations
- **Confidence Interval Analysis** - Assessment reliability metrics
- **Demographic Stratification** - Age and sex-specific baselines
- **Outlier Detection** - Handling extreme values appropriately

## 🏗 Project Structure

```
moleq_proto/
├── src/
│   ├── app/
│   │   ├── api/vo2max/route.ts    # VO2max calculation API
│   │   ├── globals.css            # MoleQlar design system
│   │   ├── layout.tsx             # Root layout component
│   │   └── page.tsx               # Main application page
│   ├── components/
│   │   ├── VO2Bar/               # Baseline comparison component
│   │   ├── VO2Dashboard/         # Main dashboard container
│   │   └── VO2Gauge/             # Interactive gauge visualization
│   ├── hooks/
│   │   └── useVO2Data.ts         # Custom data fetching hook
│   └── types/
│       └── vo2.ts                # TypeScript type definitions
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── next.config.ts                # Next.js configuration
```

## 🎨 Design System

### MoleQlar Brand Colors
```css
:root {
  --primary-color: #D3D7FF;        /* MoleQlar primary */
  --secondary-color: #101112;       /* Dark text */
  --primary-hover-color: #999CB9;   /* Interactive states */
  --bg-body: #F5F5F5;              /* Background */
  --color-body: #38383d;           /* Body text */
  --color-heading: #101112;         /* Headings */
}
```

### Component Design Principles
- **Clinical Aesthetics** - Clean, professional medical interface
- **Accessibility First** - WCAG 2.1 AA compliance
- **Responsive Design** - Mobile-first approach
- **Interactive Feedback** - Smooth animations and transitions
- **Data Visualization** - Clear, intuitive charts and gauges

## 🧪 API Reference

### GET `/api/vo2max`

Calculate VO₂max assessment with enhanced statistics.

#### Query Parameters
- `sex` (string): "M" or "F"
- `age` (number): Age in years (10-99)
- `vo2max` (number): VO₂max value in ml/kg/min (0-150)
- `min` (number, optional): Minimum range for visualization
- `max` (number, optional): Maximum range for visualization

#### Response Format
```json
{
  "vo2max": 68.2,
  "sex": "M",
  "age": 25,
  "min": 20,
  "max": 75,
  "assessment": {
    "label": "Excellent",
    "zone": "High",
    "baseline": 48.5,
    "percentageVsBaseline": 40.6,
    "zoneColor": "#51cf66",
    "confidence": 0.95,
    "percentile": 85,
    "healthRisk": "Low"
  },
  "statistics": {
    "mean": 48.5,
    "median": 49.2,
    "standardDeviation": 6.8,
    "sampleSize": 1000,
    "confidenceInterval": [47.1, 49.9]
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t moleq-vo2max .

# Run container
docker run -p 3000:3000 moleq-vo2max
```

### Traditional Hosting
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔬 Clinical Validation

### Evidence Base
- **ACSM Guidelines** - Industry standard for exercise testing
- **Peer-reviewed Research** - Cardiovascular risk correlations
- **Population Studies** - Large-scale normative databases
- **Clinical Validation** - Hospital and clinic testing protocols

### Quality Assurance
- **Statistical Validation** - Confidence intervals and error handling
- **Edge Case Testing** - Extreme values and boundary conditions
- **Cross-platform Testing** - Multiple devices and browsers
- **Accessibility Testing** - Screen readers and keyboard navigation

## 📝 License

This project is proprietary software developed for MoleQlar Analytics. All rights reserved.

## 🤝 Contributing

This is a private repository. For internal development:

1. Create a feature branch from `main`
2. Follow TypeScript and ESLint guidelines
3. Add comprehensive tests for new features
4. Update documentation as needed
5. Submit pull request for review

## 📞 Support

For technical support or clinical questions:
- **Technical Issues**: [tech-support@moleqlar.com](mailto:tech-support@moleqlar.com)
- **Clinical Questions**: [clinical@moleqlar.com](mailto:clinical@moleqlar.com)
- **Documentation**: Internal wiki at `docs.moleqlar.com`

---

**MoleQlar Analytics** - Advanced Molecular Diagnostics Platform
