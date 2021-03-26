import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Test About component', () => {
  test('Renders a heading2 with the text `About Pokédex`', () => {
    renderWithRouter(<About />);

    const heading2 = screen.getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/About Pokédex/);
  });

  test('Render 2 paragraphs with texts about Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/filter Pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Render a specific Pokédex image', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');

    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
