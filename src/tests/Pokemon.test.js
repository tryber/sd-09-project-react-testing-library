import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Testes do componente <Pokemon />', () => {
  it('Verifica se o nome do pokemon é exibido na tela', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });

    const pikachuPath = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    userEvent.click(buttonAll);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemonType');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeURL = screen.getByAltText(/Pikachu sprite/i);

    expect(pokeName).toHaveTextContent(/Pikachu/i);
    expect(pokeType).toHaveTextContent(/Electric/i);
    expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokeURL).toHaveProperty('src', pikachuPath);
    expect(pokeURL).toHaveProperty('alt', 'Pikachu sprite');
  });

  it('Verifica se existe um link para exibir os detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetail = screen.getByText(/More details/i);

    expect(linkDetail).toBeInTheDocument();

    userEvent.click(linkDetail);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica o redirecionamento do link `More details`', () => {
    renderWithRouter(<App />);

    const pathStar = 'http://localhost/star-icon.svg';

    const linkDetail = screen.getByText(/More details/i);

    userEvent.click(linkDetail);

    const checkBox = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(checkBox);
    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toHaveProperty('src', pathStar);
  });
});
