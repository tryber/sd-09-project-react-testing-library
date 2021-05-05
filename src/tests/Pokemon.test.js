import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const getPath = (path, keyWord) => {
  const index = path.indexOf(keyWord);
  return path.substring(index - 1, path.length);
};

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);

    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    // 'O nome correto do Pokémon deve ser mostrado na tela'
    const pokemonName = getByTestId(/pokemon-name/i).innerHTML;
    expect(pokemonName).toEqual(name);

    // 'O tipo correto do pokémon deve ser mostrado na tela'
    const pokemonType = getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toEqual(type);

    // 'O peso médio do pokémon deve ser exibido com um texto'
    const weight = getByTestId(/pokemon-weight/i).innerHTML;
    expect(weight).toBe(`Average weight: ${value} ${measurementUnit}`);

    // 'A imagem do Pokémon deve ser exibida'
    const img = getByAltText(`${name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  it('Teste se o card contém um link para exibir detalhes do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    const link = getByText(/More details/i);
    userEvent.click(link);
    const url = getPath(link.href, 'pokemons');
    expect(url).toBe(`/pokemons/${id}`);
  });

  it('Teste se ao clicar no link, é redirecionado para a página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    userEvent.click(getByText(/More details/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { queryByAltText, getByText, getByRole } = renderWithRouter(<App />);
    const { name } = pokemons[0];

    userEvent.click(getByText(/More details/i));
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);

    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido
    const icon = queryByAltText(`${name} is marked as favorite`);
    expect(icon.alt).toBe(`${name} is marked as favorite`);

    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    const url = getPath(icon.src, 'star-icon');
    expect(url).toBe('/star-icon.svg');
  });
});
