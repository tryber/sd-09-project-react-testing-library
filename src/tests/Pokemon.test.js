import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('testes do componente Pokemon.js', () => {
  // created const's to solve lint problemns
  const pikachu = pokemons[0];
  const details = 'More details';

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pikachu;

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');
    const img = getByAltText(`${pikachu.name} sprite`).src;

    expect(name.innerHTML).toBe(pikachu.name);
    expect(type.innerHTML).toBe(pikachu.type);
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toBe(pikachu.image);
  });

  test('O card selecionado deve conter link details com url correta', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const link = getByText(details);
    expect(link).toHaveAttribute('href', '/pokemons/25');
    expect(link).toBeInTheDocument();
  });

  test('onClick btnDetails deve  redireciona para PokemonDetails', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnDetails = getByText(details);
    fireEvent.click(btnDetails);
    expect(getByText('Summary')).toBeInTheDocument();
  });

  test('A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(details));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachu.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const image = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(image.src).toContain('/star-icon.svg');
  });
});
