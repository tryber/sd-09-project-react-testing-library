import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testing NotFound page', () => {
  it('veriring if h2 exists', () => {
    render(<NotFound />);

    const h2 = screen.getByRole(
      'heading',
      { level: 2, name: /Page requested not found/ },
    );

    expect(h2).toBeInTheDocument();
  });

  it('veriring if img exists', () => {
    const { container } = render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('src', url);
  });
});
