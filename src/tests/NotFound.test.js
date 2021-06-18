import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing component `Not Found`', () => {
  it('test if was render a h2 title with `Page requested not found 😭`', () => {
    render(<NotFound />);

    const cryingEmoji = screen.getByText('😭');
    const errorMessage = screen.getByText(/Page requested not found/i);

    expect(cryingEmoji).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it('test if the page have a specyfic gif', () => {
    const { getByAltText } = render(<NotFound />);
    const altImageToSearch = 'Pikachu crying because the page requested was not found';
    const pokedexImage = getByAltText(altImageToSearch);
    const imagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(pokedexImage.src).toBe(imagePath);
  });
});
