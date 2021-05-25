import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('testing component About.js', () => {
  it('verify h2 content', () => {
    renderWithRouter(<About />);

    const content = screen.getByText(/About Pokédex/i);
    expect(content).toBeInTheDocument();
  });

  it('verify Pokédex image', () => {
    const { container } = renderWithRouter(<About />);
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', url);
  });
});
