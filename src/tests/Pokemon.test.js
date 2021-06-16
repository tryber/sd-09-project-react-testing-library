import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRoute';
import App from '../App';
import data from '../data';

describe('Testa o componente Pokemon', () => {
  const nameTestId = 'pokemon-name';
  const pokemonTypeTestId = 'pokemonType';
  const weightTestId = 'pokemon-weight';

  it('Renderiza informações no card do pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[0];

    const name = getByTestId(nameTestId);
    const type = getByTestId(pokemonTypeTestId);
    const weight = getByTestId(weightTestId);
    const img = getByAltText(`${data[0].name} sprite`);

    expect(name).toHaveTextContent(data[0].name);
    expect(type).toHaveTextContent(data[0].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(img.src).toBe(data[0].image);
  });

  it('O card do Pokémon contém um link que renderiza os detalhes do pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const details = getByText('More details');

    expect(details).toBeInTheDocument();

    userEvent.click(details);

    expect(history.location.pathname).toBe(`/pokemons/${data[0].id}`);

    const detailsTitle = getByText(`${data[0].name} Details`);

    expect(detailsTitle).toBeInTheDocument();
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText, getByText, getByLabelText } = renderWithRouter(<App />);

    const details = getByText('More details');
    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');
    userEvent.click(input);

    expect(input).toBeChecked();

    const home = getByText('Home');
    userEvent.click(home);

    const icon = getByAltText(`${data[0].name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });
});
