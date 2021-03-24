import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('4th Requirement: NotFound Component', () => {
  it('h2 tag with text \'Page requested not found 😭\'', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
    expect(screen.getByText('😭')).toBeInTheDocument();
  });
  it('checks img src', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getAllByRole('img')[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
