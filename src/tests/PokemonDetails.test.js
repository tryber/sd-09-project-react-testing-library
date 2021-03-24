import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
// import Pokemon from '../components/Pokemon';
// import PokemonDetails from '../components/PokemonDetails';

describe('testes do componente PokemonDetails.js', () => {
  // created const's to solve lint problemns
  const details = 'More details';
  const pikachu = pokemons[0];

  test('renders info about selected Pokémon', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(details));
    const textDetail = getByText(`${pikachu.name} Details`);
    const btn = queryByText(details);
    const h2 = getByRole('heading', { level: 2, name: 'Summary' });
    const pokeDetail = getByText(`${pikachu.summary}`);

    expect(textDetail).toBeInTheDocument();
    expect(btn).not.toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(pokeDetail).toBeInTheDocument();
  });

  test(
    'Deve existir na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { getByRole, getAllByAltText, queryByText } = renderWithRouter(<App />);
      fireEvent.click(queryByText(details));
      expect(getByRole('heading',
        { level: 2, name: `Game Locations of ${pikachu.name}` }))
        .toBeInTheDocument();
      pikachu.foundAt.forEach(({ location, map }, index) => {
        expect(queryByText(location)).toBeInTheDocument();
        expect(getAllByAltText(`${pikachu.name} location`)[index].src).toBe(map);
      });
    },
  );

  test('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByLabelText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(details));
    const favLabel = getByLabelText('Pokémon favoritado?');
    expect(favLabel).toBeInTheDocument();
  });
});
