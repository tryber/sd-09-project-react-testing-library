import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('6- Test the component <Pokemon />', () => {
  it('Should render acard with pokemon`s info', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const namePokemon = getByText('Pikachu');
    const typePokemon = getAllByText('Electric');
    const weigthPokemon = getByText('Average weight: 6.0 kg');
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveLength(2);
    expect(weigthPokemon).toBeInTheDocument();
  });

  it('Should have a link `more details` and render path /pokemon/id', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);
    userEvent.click(linkMoreDetails);
    const titleSummary = getByText('Summary');

    expect(titleSummary).toBeInTheDocument();
  });

  it('Should have id patch equal id pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Should have a star in pokemon favorited', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);
    userEvent.click(linkMoreDetails);
    const favoritedCheckbox = getByText('Pokémon favoritado?');
    userEvent.click(favoritedCheckbox);

    const allImgs = getAllByRole('img');
    const starImg = allImgs[1];
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
    expect(starImg.alt).toBe('Pikachu is marked as favorite');

    const firstImage = allImgs[0];
    expect(firstImage.alt).toBe('Pikachu sprite');
    expect(firstImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
