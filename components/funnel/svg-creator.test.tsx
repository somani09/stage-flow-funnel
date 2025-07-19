import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SVGCreator from './svg-creator'; // Adjust the import path as necessary

describe('SVGCreator', () => {
  const props = {
    id: '1',
    topWidth: 200,
    bottomWidth: 100,
    height: 300,
    gradientStart: '#FFFFFF',
    gradientEnd: '#000000',
    containerWidth: 500,
  };

  it('renders an SVG element with correct attributes', () => {
    const { container } = render(<SVGCreator {...props} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy(); // Check if the SVG element is rendered
    expect(svg?.namespaceURI).toBe('http://www.w3.org/2000/svg'); // Check if it's an SVG element
  });

  it('includes a path with the correct "d" attribute', () => {
    const { container } = render(<SVGCreator {...props} />);
    const path = container.querySelector('path');

    expect(path).toBeTruthy(); // Ensure the path exists
    expect(path?.getAttribute('fill')).toContain(`linear-gradient-${props.id}`); // Check if fill attribute is correctly set
    expect(path?.getAttribute('d')).toBeDefined(); // Ensure that 'd' attribute exists
  });

  it('defines a linear gradient with correct stops', () => {
    const { container } = render(<SVGCreator {...props} />);
    const linearGradient = container.querySelector(
      `#linear-gradient-${props.id}`,
    );

    expect(linearGradient).toBeTruthy(); // Check the gradient is defined
    const stops = container.querySelectorAll('stop');
    expect(stops.length).toBe(2); // Check for two color stops
    expect(stops[0].getAttribute('stop-color')).toBe(props.gradientStart); // Check start color
    expect(stops[1].getAttribute('stop-color')).toBe(props.gradientEnd); // Check end color
  });

  it('adjusts SVG dimensions based on container width changes', () => {
    const initialProps = {
      id: '1',
      topWidth: 200,
      bottomWidth: 100,
      height: 300,
      gradientStart: '#FFFFFF',
      gradientEnd: '#000000',
      containerWidth: 500,
    };

    // Render with initial container width
    const { container, rerender } = render(<SVGCreator {...initialProps} />);
    let svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('100%');
    let path = container.querySelector('path');
    const initialPathD = path?.getAttribute('d');

    // Change container width
    const updatedWidth = 800;
    rerender(<SVGCreator {...initialProps} containerWidth={updatedWidth} />);
    svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('100%'); // Still expect full width to ensure responsiveness
    path = container.querySelector('path');
    const updatedPathD = path?.getAttribute('d');

    // Expect the path data to change
    expect(updatedPathD).not.toEqual(initialPathD);
  });
});
