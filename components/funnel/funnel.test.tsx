import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import Funnel from './funnel';
import type { FunnelStage } from '@mm-common';
import { mockBusinessList } from '@/lib/mocks/business';

describe('Funnel', () => {
  const funnelDataMock: FunnelStage[] = [
    { stageId: 1, stageConversionName: 'Distribution', value: 10000 },
    { stageId: 2, stageConversionName: 'Research', value: 7000 },
    { stageId: 3, stageConversionName: 'Leads', value: 3000 },
    { stageId: 4, stageConversionName: 'Purchases', value: 2000 },
  ];

  const handleSelectionMock = vi.fn();

  afterEach(cleanup);

  it('renders without crashing', () => {
    const { container } = render(
      <Funnel
        funnelData={funnelDataMock}
        selectedStage={undefined}
        handleSelection={handleSelectionMock}
      />,
    );
    expect(container).toBeTruthy();
  });

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();

    // Setup global mock for ResizeObserver
    global.ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  const mocks = vi.hoisted(() => {
    return {
      useBusiness: () => {
        return {
          business: mockBusinessList[0],
          updateBusiness: vi.fn(),
        };
      },
    };
  });
  // Mock the useAuth hook
  vi.mock('@/contexts/business', () => ({
    useBusiness: mocks.useBusiness,
  }));

  it('initializes ResizeObserver and sets dimensions', () => {
    render(
      <Funnel
        funnelData={funnelDataMock}
        selectedStage={undefined}
        handleSelection={handleSelectionMock}
      />,
    );
    expect(ResizeObserver).toHaveBeenCalled(); // Use ResizeObserver directly since it's mocked globally
  });

  it('creates SVG data on mount and when dependencies change', () => {
    const { rerender } = render(
      <Funnel
        funnelData={funnelDataMock}
        selectedStage={undefined}
        handleSelection={handleSelectionMock}
      />,
    );
    expect(handleSelectionMock).not.toHaveBeenCalled();

    // Simulate a change in container width
    act(() => {
      rerender(
        <Funnel
          funnelData={funnelDataMock}
          selectedStage={undefined}
          handleSelection={handleSelectionMock}
        />,
      );
    });
    expect(handleSelectionMock).not.toHaveBeenCalled();
  });

  it('handles user interactions correctly', async () => {
    const { getByText } = render(
      <Funnel
        funnelData={funnelDataMock}
        selectedStage={undefined}
        handleSelection={handleSelectionMock}
      />,
    );

    // Simulate clicking on a different stage
    const stageElement = getByText('Purchases');
    fireEvent.click(stageElement);
    expect(handleSelectionMock).toHaveBeenCalledWith(funnelDataMock[3]);
  });
});
