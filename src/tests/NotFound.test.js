import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Test NotFound component', () => {
  it('verifies the message page request not found', () => {
    render(<NotFound />);
    const arrayOfElements = [
      screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      }),
      screen.getByLabelText(/crying emoji/i),
      screen.getByAltText(/pikachu crying/i),
    ];
    expect(arrayOfElements[2].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    arrayOfElements.forEach((element) => expect(element).toBeInTheDocument());
  });
});
