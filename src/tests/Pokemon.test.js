import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Pokemon component', () => {
  it('should render the pokemon card', () => {
    const { getByText, getByTestId, getByAltText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/home/i));
    history.push('/');
    const card = getByText(/pikachu/i);
    expect(card).toBeInTheDocument();
    expect(card.innerHTML).toBe('Pikachu');
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');
    const averageWeigth = getByTestId('pokemon-weight');
    expect(averageWeigth).toBeInTheDocument();
    expect(averageWeigth.innerHTML).toBe('Average weight: 6.0 kg');
    const image = getByAltText(/sprite/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('should shows a link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokeLink = getByRole('link', { name: /More details/i });
    expect(pokeLink).toBeInTheDocument();
    expect(pokeLink.href).toBe('http://localhost/pokemons/25');
  });
  it('should redirect to details when clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    const pathWay = '/pokemons/25';
    history.push(pathWay);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pathWay);
    const details = getByText(/summary/i);
    expect(details).toBeInTheDocument();
  });
  it('should have an icon on favorite pokemons', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/details/i));
    const pathline = '/pokemons/25';
    history.push(pathline);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pathline);
    const favoriting = getByText(/pokémon favoritado/i);
    expect(favoriting).toBeInTheDocument();
    userEvent.click(favoriting);
    const favorite = getByAltText(/pikachu is marked as favorite/i);
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
  });
});
