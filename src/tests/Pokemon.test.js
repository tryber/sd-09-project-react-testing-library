import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests regarding Pokemon.js component', () => {
  it('checks if correct structure is displayed', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByTestId('pokemon-name')).toHaveTextContent('Dragonair');
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 16.5 kg');
    expect(getByRole('img', { name: 'Dragonair sprite' })).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });
  it('checks if link directs to correct path', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
    const pikachuPokedexNumber = '25';
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(pathname).toContain(pikachuPokedexNumber);
  });
  it('checks star icon for favorited pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /More details/ }));
    fireEvent.click(getByRole('checkbox'));
    const starIcon = getByRole('img', { name: /marked as favorite/ });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon.alt).toContain('Pikachu');
  });
});
