import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 06', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const namePoke = getByTestId('pokemon-name');
    const typePoke = getByTestId('pokemonType');
    const weightPoke = getByTestId('pokemon-weight');
    const imgPoke = getByAltText(`${namePoke.textContent} sprite`);

    expect(namePoke.textContent).toBe('Pikachu');
    expect(typePoke.textContent).toBe('Electric');
    expect(weightPoke.textContent).toBe('Average weight: 6.0 kg');
    expect(imgPoke.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegaç', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkPoke = getByText('More details');
    expect(linkPoke.attributes.href.value).toBe('/pokemons/25');
    fireEvent.click(linkPoke);

    const detailsPage = getByText('Pikachu Details');
    expect(detailsPage).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const linkPokeDetails = getByText('More details');
    fireEvent.click(linkPokeDetails);

    const favPokeLabel = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favPokeLabel);

    const favPokeImg = getByAltText('Pikachu is marked as favorite');
    expect(favPokeImg.src).toBe('http://localhost/star-icon.svg');
  });
});
