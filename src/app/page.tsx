// app/page.tsx
import VO2Dashboard from "@/components/VO2Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-body)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
            style={{ 
              background: 'var(--primary-color)', 
              color: 'var(--secondary-color)' 
            }}
          >
            <span className="text-sm font-semibold tracking-wide uppercase">
              MoleQlar Analytics
            </span>
          </div>
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ 
              color: 'var(--color-heading)',
              letterSpacing: 'var(--font-heading-letter-spacing)'
            }}
          >
            VO₂max Assessment
          </h1>
        </div>

        {/* Dashboard Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <VO2Dashboard />
          </div>
        </div>

        {/* Clinical Information Footer */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-8"
            style={{
              background: 'var(--color-article-card-bg)',
              boxShadow: 'var(--block-shadows)',
              borderRadius: 'var(--block-border-radius)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: 'var(--color-heading)' }}
            >
              About VO₂max Assessment
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--color-heading)' }}
                >
                  Clinical Significance
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-body)' }}
                >
                  VO₂max represents the maximum rate of oxygen consumption during incremental exercise. 
                  It serves as the gold standard for measuring cardiorespiratory fitness and is a strong 
                  predictor of cardiovascular health and all-cause mortality.
                </p>
                
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--color-heading)' }}
                >
                  Assessment Categories
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--gauge-low)' }}
                    ></div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-body)' }}
                    >
                      Poor - Very Poor: Increased health risk
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--gauge-med)' }}
                    ></div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-body)' }}
                    >
                      Fair - Good: Average fitness level
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--gauge-high)' }}
                    ></div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-body)' }}
                    >
                      Excellent - Superior: Optimal fitness
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--color-heading)' }}
                >
                  Methodology
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-body)' }}
                >
                  Our assessment utilizes the American College of Sports Medicine (ACSM) guidelines 
                  for fitness classification, providing age and sex-specific normative values. 
                  Baseline comparisons are calculated from healthy population data within your demographic group.
                </p>
                
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--color-heading)' }}
                >
                  Clinical Applications
                </h3>
                <ul 
                  className="text-sm space-y-1"
                  style={{ color: 'var(--color-body)' }}
                >
                  <li>• Cardiovascular risk stratification</li>
                  <li>• Exercise prescription development</li>
                  <li>• Training program effectiveness monitoring</li>
                  <li>• Health outcome prediction</li>
                  <li>• Population health research</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}