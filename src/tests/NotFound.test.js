import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFound } from '../components';

describe('testing not found component', () => {
  it('should have an H2 with text page not found', () => {
    const { getByRole, getByAltText } = render(<MemoryRouter><NotFound /></MemoryRouter>);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
    const notFoundImg = getByAltText(/pikachu crying/i);
    expect(notFoundImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
