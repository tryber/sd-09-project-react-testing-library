import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const macthTest = { params: { id: '25' } };

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, queryByRole, getByRole } = renderWithRouter(
      <PokemonDetails
        match={ macthTest }
        pokemons={ pokemons }
        isPokemonFavoriteById="false"
      />,
    );
    const { summary } = pokemons[0];

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(queryByRole('link')).toBeNull();
    expect(getByRole('heading', { name: 'Summary', level: 2 })).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
  });

  it('Existe na página mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        match={ macthTest }
        pokemons={ pokemons }
        isPokemonFavoriteById="false"
      />,
    );
    const h2Location = `Game Locations of ${pokemons[0].name}`;
    expect(getByRole('heading', { name: h2Location })).toBeInTheDocument();

    pokemons[0].foundAt.forEach((local) => {
      expect(getByText(local.location)).toBeInTheDocument();
    });

    const images = getAllByAltText(/location/);
    images.forEach((img, index) => {
      expect(img.src).toBe(pokemons[0].foundAt[index].map);
      expect(img.alt).toBe(`${pokemons[0].name} location`);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByLabelText, getByRole, getByText, getAllByTestId } = renderWithRouter(
      <App />,
    );

    expect(getByText('More details')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));

    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?').type).toEqual('checkbox');

    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox').checked).toBe(true);
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});
