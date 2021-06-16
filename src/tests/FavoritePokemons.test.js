import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRoute';
import { FavoritePokemons } from '../components';
import data from '../data';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  it('Se nenhum pokémon selecionado a mensagem aparece', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFoundMessage = getByText('No favorite pokemon found');

    expect(noFoundMessage).toBeInTheDocument();
  });

  it('Se Aparece os card dos pokemons favoritados', () => {
    const { getByTestId, getByText, getByLabelText } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[0];

    const details = getByText('More details');

    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');

    userEvent.click(input);
    expect(input).toBeChecked();

    const link = getByText('Favorite Pokémons');

    userEvent.click(link);

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');

    expect(name).toHaveTextContent(data[0].name);
    expect(type).toHaveTextContent(data[0].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Testa se nenhum card aparece se não favoritado', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const details = getByText('More details');

    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');

    userEvent.click(input);
    expect(input).not.toBeChecked();

    const link = getByText('Favorite Pokémons');

    userEvent.click(link);

    const noFoundMessage = getByText('No favorite pokemon found');

    expect(noFoundMessage).toBeInTheDocument();
  });
});
