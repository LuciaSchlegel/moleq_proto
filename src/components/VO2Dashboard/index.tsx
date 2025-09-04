"use client";
import { useEffect, useState } from "react";
import { Sex } from "@/types/vo2";
import { useVO2Data } from "@/hooks/useVO2Data";
import VO2Gauge from "@/components/VO2Gauge";

export default function VO2Dashboard() {
  const [sex, setSex] = useState<Sex>("M");
  const [age, setAge] = useState<number>(25);
  const [vo2max, setVo2max] = useState<number>(68.2);
  const [min] = useState<number>(20);
  const [max] = useState<number>(75);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data, loading, error } = useVO2Data({
    sex,
    age,
    vo2max,
    min,
    max,
  });

  // Generate age options (10-99)
  const ageOptions = Array.from({ length: 90 }, (_, i) => i + 10);
  
  // Generate VO2max options with 0.5 increments
  const vo2Options = Array.from({ length: 201 }, (_, i) => (i * 0.5).toFixed(1));

  // Handle input validation for desktop
  const handleAgeChange = (value: number) => {
    if (value >= 10 && value <= 99) {
      setAge(value);
    }
  };

  const handleVO2Change = (value: number) => {
    if (value >= 0 && value <= 100) {
      setVo2max(value);
    }
  };

  return (
    <div className="vo2-dashboard">
      <div className="vo2-controls">
        <div className="vo2-control-group">
          <label htmlFor="sex-select">Sex</label>
          <select
            id="sex-select"
            className="vo2-select"
            value={sex}
            onChange={e => setSex(e.target.value as Sex)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        
        <div className="vo2-control-group">
          <label htmlFor="age-input">Age</label>
          {isMobile ? (
            <select
              id="age-input"
              className="vo2-select"
              value={age}
              onChange={e => setAge(parseInt(e.target.value))}
            >
              {ageOptions.map(ageValue => (
                <option key={ageValue} value={ageValue}>
                  {ageValue} years
                </option>
              ))}
            </select>
          ) : (
            <input
              id="age-input"
              className="vo2-input"
              type="number"
              min={10}
              max={99}
              value={age}
              onChange={e => handleAgeChange(+e.target.value)}
              placeholder="25"
            />
          )}
        </div>
        
        <div className="vo2-control-group">
          <label htmlFor="vo2-input">VO₂max (ml/kg/min)</label>
          {isMobile ? (
            <select
              id="vo2-input"
              className="vo2-select"
              value={vo2max.toFixed(1)}
              onChange={e => setVo2max(parseFloat(e.target.value))}
            >
              {vo2Options.map(vo2Value => (
                <option key={vo2Value} value={vo2Value}>
                  {vo2Value} ml/kg/min
                </option>
              ))}
            </select>
          ) : (
            <input
              id="vo2-input"
              className="vo2-input"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={vo2max}
              onChange={e => handleVO2Change(+e.target.value)}
              placeholder="68.2"
            />
          )}
        </div>
      </div>

      {/* Main Gauge Component */}
      <VO2Gauge
        data={data}
        loading={loading}
        error={error}
      />

      {data && !loading && !error && (
        <div className="vo2-metrics">
          <div className="vo2-metric-row">
            <span className="vo2-metric-label">Assessment Level</span>
            <span className="vo2-metric-value">{data.assessment.label}</span>
          </div>
          <div className="vo2-metric-row">
            <span className="vo2-metric-label">Fitness Zone</span>
            <span
              className="vo2-metric-value"
              style={{ color: data.assessment.zoneColor }}
            >
              {data.assessment.zone}
            </span>
          </div>
          <div className="vo2-metric-row">
            <span className="vo2-metric-label">Age Group Baseline</span>
            <span className="vo2-metric-value">
              {data.assessment.baseline.toFixed(1)} ml/kg/min
            </span>
          </div>
          <div className="vo2-metric-row">
            <span className="vo2-metric-label">Performance vs Baseline</span>
            <div className="vo2-performance-indicator">
              <span
                className="vo2-metric-value"
                style={{
                  color: data.assessment.percentageVsBaseline >= 0 ? '#22c55e' : '#dc4446'
                }}
              >
                {data.assessment.percentageVsBaseline >= 0 ? '+' : ''}
                {data.assessment.percentageVsBaseline.toFixed(1)}%
              </span>
              <span style={{
                fontSize: '12px',
                color: data.assessment.percentageVsBaseline >= 0 ? '#22c55e' : '#dc4446'
              }}>
                {data.assessment.percentageVsBaseline >= 0 ? '↗️' : '↘️'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}