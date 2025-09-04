// hooks/useVO2Data.ts
"use client";
import { useState, useEffect } from 'react';
import { VO2APIResponse, VO2QueryParams } from '@/types/vo2';

interface UseVO2DataReturn {
  data: VO2APIResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useVO2Data(params: VO2QueryParams): UseVO2DataReturn {
  const [data, setData] = useState<VO2APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams({
        sex: params.sex,
        age: params.age.toString(),
        vo2max: params.vo2max.toString(),
        min: params.min.toString(),
        max: params.max.toString(),
      });

      const response = await fetch(`/api/vo2max?${searchParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: VO2APIResponse = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching VO2 data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [params.sex, params.age, params.vo2max, params.min, params.max]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
}