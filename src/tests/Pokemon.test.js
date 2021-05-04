import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachuPath = '/pokemons/25';
describe('Deve renderizadar um card com as informações de determinado pokémon.', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByText } = renderWithRouter(<App />);

    const pokemonName = getByText('Pikachu');

    expect(pokemonName).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonType = getByTestId('pokemonType');

    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Verifica se as informações do pokémon estão corretas', () => {
    const { getByText } = renderWithRouter(<App />);

    const pokemonInfo = getByText('Average weight: 6.0 kg');

    expect(pokemonInfo).toBeInTheDocument();
  });

  it('Testa a imagem do pokémon', () => {
    const { getByAltText } = renderWithRouter(<App />);

    const pokemonImg = getByAltText(/Pikachu sprite/i);

    expect(pokemonImg.getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Testa o link More details', () => {
  it('Testa se o card do pokémon possui um link para ver seus detalhes', () => {
    const { getByText } = renderWithRouter(<App />);

    const link = getByText('More details');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(pikachuPath);
  });

  it('Testa se o link redireciona para a página de detalhes do pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  it('O ícone deve ser uma imagem com src contendo o caminho /star-icon.svg', () => {
    const { getByText, getByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    // favoritar o pokemon
    const checkboxInput = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });

    fireEvent.click(checkboxInput);

    // verificar se o pokemon favoritado está na tela
    const favoritePokemon = getByText('Pikachu');
    expect(favoritePokemon).toBeInTheDocument();

    const favoriteStar = getByAltText(/Pikachu is marked as favorite/i);

    expect(favoriteStar.getAttribute('src')).toBe('/star-icon.svg');
  });
});
