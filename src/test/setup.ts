import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock global fetch
globalThis.fetch = vi.fn();
