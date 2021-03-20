import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Electric');

    const pokeAverageWeight = getByText('Average weight: 6.0 kg');
    expect(pokeAverageWeight).toBeInTheDocument();

    const pokemonSprite = getByRole('img');
    expect(pokemonSprite.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonSprite.alt).toBe('Pikachu sprite');
  });

  test(`Testa se o card do Pokémon indicado na Pokédex contém link de navegação, p/ exibir
   detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do Pokémon exibido`,
  () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it(`também se a URL exibida no navegador muda para /pokemon/<id>, 
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByLabelText, getAllByRole } = renderWithRouter(<App />);

    const detailsLink = getByText(/more details/i);
    userEvent.click(detailsLink);

    const favoritePokemon = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemon);

    const image = getAllByRole('img')[1];
    expect(image.src).toBe('http://localhost/star-icon.svg');
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
