import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('testing component About', () => {
  it('should have pokédex', () => {
    const { getByRole } = render(<MemoryRouter><About /></MemoryRouter>);
    const pokeInfo = getByRole('heading');
    expect(pokeInfo).toBeInTheDocument();
  });
  it('should have about pokédex', () => {
    const { getByRole } = render(<MemoryRouter><About /></MemoryRouter>);
    const aboutPokemon = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutPokemon).toBeInTheDocument();
  });
  it('should have two paragraphs about pokédex', () => {
    const { getByText } = render(<MemoryRouter><About /></MemoryRouter>);
    const paragraph1 = getByText(/This application/i);
    const paragraph2 = getByText(/One can filter Pokémons/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it('should have an pokédex img', () => {
    const { getByAltText } = render(<MemoryRouter><About /></MemoryRouter>);
    const pokeImg = getByAltText('Pokédex');
    expect(pokeImg.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
