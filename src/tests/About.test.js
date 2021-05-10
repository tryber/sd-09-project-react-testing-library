import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testing Pokedéx information from About component', () => {
  it('tests if there\'s a heading level 2 in the page', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('tests if there are two paragraphs in the page', () => {
    const { getByText } = render(<About />);

    const paragraph1 = getByText(/application simulates a pokédex/i);
    const paragraph2 = getByText(/filter pokémons by type/i);
    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  it('tests if there\'s pokedex image in the page', () => {
    const { getByRole } = render(<About />);
    const pokedexImg = getByRole('img', {
      alt: 'Pokédex',
    });

    expect(pokedexImg.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
