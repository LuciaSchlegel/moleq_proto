// components/VO2BaselineBar.tsx
"use client";
import { VO2APIResponse } from '@/types/vo2';

interface VO2BaselineBarProps {
  data: VO2APIResponse;
}

export default function VO2BaselineBar({ data }: VO2BaselineBarProps) {
  const { vo2max, assessment } = data;
  const { baseline, percentageVsBaseline } = assessment;

  // Calculate the range for display (baseline ±25% for a tighter view)
  const range = baseline * 0.5; // 50% range total (±25%)
  const minDisplay = Math.max(0, baseline - range/2);
  const maxDisplay = baseline + range/2;
  
  // Calculate positions on the bar (0-1 scale)
  const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
  const baselinePosition = 0.5; // Always center baseline
  const currentPosition = clamp01((vo2max - minDisplay) / (maxDisplay - minDisplay));
  
  // Performance indicators
  const getPerformanceColor = () => {
    // Handle extremely low values first
    if (vo2max < baseline * 0.6) return '#dc4446'; // Very poor - red
    if (percentageVsBaseline >= 10) return '#059669'; // Excellent - dark green
    if (percentageVsBaseline >= 0) return '#22c55e';  // Good - green
    if (percentageVsBaseline >= -10) return '#eab308'; // Average - yellow
    return '#dc4446'; // Below average - red
  };

  const performanceColor = getPerformanceColor();
  const isAboveBaseline = vo2max >= baseline;

  return (
    <div className="vo2-baseline-simple">
      {/* Simplified header */}
      <div className="vo2-baseline-header-simple">
        <span className="vo2-baseline-label">vs Population Average</span>
        <span className="vo2-baseline-percentage" style={{ color: performanceColor }}>
          {isAboveBaseline ? '+' : ''}{percentageVsBaseline.toFixed(1)}%
        </span>
      </div>

      {/* Simple comparison bar */}
      <div className="vo2-baseline-bar-container">
        <div className="vo2-baseline-bar">
          <div className="vo2-baseline-track-simple" />
          <div className="vo2-baseline-center-marker" />
          <div 
            className="vo2-current-position"
            style={{ 
              left: `${currentPosition * 100}%`,
              backgroundColor: performanceColor
            }}
          />
                    <div 
            className="vo2-connection-line"
            style={{
              left: `${Math.min(baselinePosition, currentPosition) * 100}%`,
              width: `${Math.abs(currentPosition - baselinePosition) * 100}%`,
              backgroundColor: `${performanceColor}40`
            }}
          />
        </div>

        <div className="vo2-baseline-scale-simple">
          <span>{minDisplay.toFixed(0)}</span>
          <span className="vo2-baseline-center-label">{baseline.toFixed(1)}</span>
          <span>{maxDisplay.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}