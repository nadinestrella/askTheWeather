import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWeather } from './useWeather';
import { renderHook, act } from '@testing-library/react';
import * as service from '../services/fetchWeather';

//Throw in a mock for fetchWeather
vi.mock('../services/fetchWeather');

describe('useWeather', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('fetches weather and updates state', async () => {
    vi.spyOn(service, 'fetchWeather').mockResolvedValue({
      city: 'Paris',
      country: 'France',
      temperature: 20,
      condition: 1,
      forecast: [],
    });
    //render the hook and call searchCity
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity('Paris');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.weatherData?.city).toBe('Paris');
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    vi.spyOn(service, 'fetchWeather').mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity('Paris');
    });

    expect(result.current.error).toBe('API error');
  });
});
