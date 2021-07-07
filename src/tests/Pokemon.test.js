import React from 'react';
import { Router } from 'react-router-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente Pokemon:', () => {
  it('Verifica se é renderizado um card c/ as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/^Pikachu$/);
    const type = screen.getByTestId('pokemonType');
    expect(type).toHaveTextContent(/^Electric$/);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/^Average weight: 6.0 kg$/);
    const image = screen.getByAltText(/^Pikachu sprite$/);
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifica se há link de navegação para ver os detalhes deste Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verfica se há link favorite Pokémon', () => {
    const poke = pokemons[0];

    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ poke } isFavorite />);

    const srcImage = '/star-icon.svg';
    const altImage = getByAltText(`${poke.name} is marked as favorite`);
    expect(altImage).toHaveAttribute('src', srcImage);
  });
});
