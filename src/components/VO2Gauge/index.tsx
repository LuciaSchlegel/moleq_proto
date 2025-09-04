// components/VO2Gauge.tsx - Updated with simplified baseline bar
"use client";
import { useState, useEffect } from "react";
import { VO2GaugeProps } from "@/types/vo2";
import GaugeComponent from 'react-gauge-component';
import VO2BaselineBar from "@/components/VO2Bar";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export default function VO2Gauge({ data, loading, error }: VO2GaugeProps) {
  const [mounted, setMounted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data) {
      setAnimationKey(prev => prev + 1);
    }
  }, [data?.vo2max]);

  if (!mounted) {
    return (
      <div className="vo2-card-modern">
        <div className="vo2-loading">
          <div className="vo2-spinner"></div>
          <p>Initializing...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="vo2-card-modern">
        <div className="vo2-loading">
          <div className="vo2-spinner"></div>
          <p>Loading VO₂max assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vo2-card-modern">
        <div className="vo2-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="vo2-card-modern">
        <div className="vo2-error">
          <p>No assessment data available</p>
        </div>
      </div>
    );
  }

  const { vo2max, sex, age, min, max, assessment } = data;
  const { label, zone, baseline, percentageVsBaseline, zoneColor } = assessment;

  const adjustedMin = Math.min(min, vo2max - 10, 15);
  const adjustedMax = Math.max(max, vo2max + 10);

  // Zone configuration for the gauge
  const getZoneColors = () => {
    // ACSM-based thresholds adapted for gauge
    const poorThreshold = 35;
    const fairThreshold = 45;
    const goodThreshold = 60;
    
    const firstLimit = Math.min(poorThreshold, vo2max > poorThreshold ? poorThreshold : adjustedMax * 0.4);
    
    return [
      {
        limit: firstLimit,
        color: "#dc4446", // Red for poor/critically low
        showTick: false
      },
      {
        limit: Math.min(fairThreshold, adjustedMax * 0.6),
        color: "#fab005", // Amber for fair
        showTick: false
      },
      {
        limit: Math.min(goodThreshold, adjustedMax * 0.8),
        color: "#22c55e", // Green for good
        showTick: false
      },
      {
        limit: adjustedMax,
        color: "#059669", // Dark green for excellent
        showTick: false
      }
    ];
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getAssessmentIcon = () => {
    switch (zone) {
      case 'Low': return label === 'Critically Low' ? '🚨' : '⚠️';
      case 'Medium': return '✅';
      case 'High': return '🏆';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="vo2-card-modern">
      <div className="vo2-header-modern">
        <div className="vo2-group-badge">
          <span className="vo2-group-icon">👤</span>
          {sex === 'M' ? 'Male' : 'Female'}, {age} years
        </div>
      </div>

      <h1 className="vo2-title-modern">VO₂max</h1>

      {/* Main Gauge using React Gauge Component */}
      <div className="vo2-fan-gauge" key={animationKey}>
        <div className="vo2-gauge-container">
          <GaugeComponent
            value={vo2max}
            minValue={adjustedMin}
            maxValue={adjustedMax}
            type="semicircle"
            style={{
              width: '100%',
              height: '100%'
            }}
            arc={{
              cornerRadius: 8,
              padding: 0.02,
              width: 0.18,
              gradient: false,
              subArcs: getZoneColors()
            }}
            pointer={{
              type: "needle",
              color: "#1e293b",
              baseColor: "#64748b",
              length: 0.80,
              animate: true,
              elastic: true,
              animationDuration: 2500,
              animationDelay: 300,
              width: 12
            }}
            labels={{
              valueLabel: {
                style: {
                  fontSize: "0px",
                  fill: "transparent"
                },
                hide: true
              },
              tickLabels: {
                type: "outer",
                hideMinMax: false,
                defaultTickValueConfig: {
                  style: {
                    fontSize: "11px",
                    fill: "#64748b",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: "500"
                  },
                  formatTextValue: (value: number) => {
                    if (value === adjustedMin || value === adjustedMax || value === 35 || value === 45 || value === 60) {
                      return value.toString();
                    }
                    return "";
                  }
                },
                defaultTickLineConfig: {
                  width: 1,
                  length: 6,
                  color: "#94a3b8",
                  distanceFromArc: 4,
                  hide: false
                }
              }
            }}
          />
        </div>
      </div>

      <div className="vo2-value-display">
        <div className="vo2-main-value" style={{ color: zoneColor }}>
          {vo2max.toFixed(1)}
        </div>
        <div className="vo2-unit">ml/kg/min</div>
      </div>

      <div 
        className="vo2-assessment-modern"
        style={{ 
          background: `linear-gradient(135deg, ${zoneColor}15, ${zoneColor}25)`,
          border: `1px solid ${zoneColor}40`,
          color: zoneColor
        }}
      >
        <span className="vo2-info-icon">{getAssessmentIcon()}</span>
        {label}
      </div>

      <VO2BaselineBar data={data} />

      <div 
        className="vo2-baseline-modern"
        style={{
          background: percentageVsBaseline >= 0 
            ? 'linear-gradient(135deg, #22c55e15, #22c55e25)'
            : 'linear-gradient(135deg, #dc444615, #dc444625)',
          border: percentageVsBaseline >= 0 
            ? '1px solid #22c55e40'
            : '1px solid #dc444640',
          color: percentageVsBaseline >= 0 ? '#22c55e' : '#dc4446'
        }}
      >
        <span className="vo2-info-icon">📊</span>
        {formatPercentage(percentageVsBaseline)} vs baseline
      </div>
    </div>
  );
}