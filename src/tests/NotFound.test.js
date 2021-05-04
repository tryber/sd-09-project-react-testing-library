import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 4: Component NotFound tests', () => {
  it('Renders `Page requested not found` message', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<NotFound />);
    expect(getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    })).toBeInTheDocument();
    expect(getByLabelText(/Crying emoji/i)).toBeInTheDocument();
  });
  it('Renders not found image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    expect(getAllByRole('img')[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
