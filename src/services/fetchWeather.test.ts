import { describe, it, expect, afterEach, vi, type Mock } from 'vitest';
import { fetchWeather } from './fetchWeather';

//global mock for fetch
globalThis.fetch = vi.fn();

describe('fetchWeather', () => {
  //cleanup mocks after each test
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns weather data when API responds correctly', async () => {
    (fetch as Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: 'Madrid',
              country: 'Spain',
              latitude: 40,
              longitude: -3,
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current_weather: {
            temperature: 25,
            weathercode: 1,
          },
          daily: {
            time: ['2024-01-01'],
            temperature_2m_max: [26],
            temperature_2m_min: [18],
            weathercode: [1],
          },
        }),
      });

    const result = await fetchWeather('Madrid');

    expect(result.city).toBe('Madrid');
    expect(result.temperature).toBe(25);
    expect(result.forecast).toHaveLength(1);
  });

  it('throws error when city is not found', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: [] }),
    });
    await expect(fetchWeather('UnknownCity')).rejects.toThrow('City not found');
  });
});
