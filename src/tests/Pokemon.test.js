import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 06 - Pokemon.js', () => {
  it('Testa se o card contém as informações de determinado pokémon.', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);

    const namePokemon = getByTestId(/pokemon-name/i);
    expect(namePokemon.textContent).toBe('Pikachu');

    const typePokemon = getByTestId(/PokemonType/i);
    expect(typePokemon.textContent).toBe('Electric');

    const averageWeight = getByTestId(/pokemon-weight/i);
    expect(averageWeight.textContent).toBe('Average weight: 6.0 kg');

    const imagePokemon = getByAltText(/Pikachu sprite/i);
    expect(imagePokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card do Pokémon contém um link "More details"', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
  });

  it('Testa se "More details" redireciona p/ página de detalhes.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname: detailsPath } = history.location;
    expect(detailsPath).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname: detailsPath } = history.location;
    expect(detailsPath).toBe('/pokemons/25');

    userEvent.click(getByRole('checkbox'));

    const starPikachu = getByAltText(/pikachu is marked as favorite/i);
    expect(starPikachu.src).toBe('http://localhost/star-icon.svg');
  });
});
