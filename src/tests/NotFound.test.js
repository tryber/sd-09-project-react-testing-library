import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Tests NotFound', () => {
  let renderedScreen;
  beforeEach(() => {
    renderedScreen = render(<MemoryRouter><NotFound /></MemoryRouter>);
  });

  test('Tests Heading', () => {
    const element = screen.getByRole('heading', { level: 2 });
    expect(element).toHaveTextContent('Page requested not found 😭');
  });

  test('Tests Image', () => {
    const { container } = renderedScreen;
    const image = container.getElementsByTagName('img');
    expect(image.length).toBe(1);
    expect(image[0]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
