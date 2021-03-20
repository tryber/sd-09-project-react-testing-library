import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('testing pokédex component', () => {
  it('should have an h2 with encountered pokemons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexHeading = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('should show next pokémon when clicked', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/home/i));
    history.push('/');
    const btn = getByRole('button', { name: /próximo pokémon/i });
    expect(btn).toBeInTheDocument();
    data.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
      userEvent.click(btn);
    });
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('should show only one per time', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const card = getByTestId(/pokemon-name/i);
    expect(card).toBeInTheDocument();
  });

  it('should test filter buttons', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button');
    btnType.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    userEvent.click(btnType[1]);
    expect(getByText(/charmander/i)).toBeInTheDocument();
    const btn = getByTestId('next-pokemon');
    data.filter((types) => types.type === 'fire')
      .forEach((item) => {
        expect(getByText(item.name)).toBeInTheDocument();
        userEvent.click(btn);
        expect(getByText(item.name)).toBe(item.type);
      });

    btnType.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should reset the filter button', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const allbutton = getByText(/all/i);
    expect(allbutton).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /all/i }));
    expect(allbutton).toBeInTheDocument();
  });
  it('should create a button for each type pokemon', () => {
    const { queryByRole } = renderWithRouter(<App />);
    const types = queryByRole('button', { name: /fire/i });
    expect(types).not.toBeNull();
  });
});
