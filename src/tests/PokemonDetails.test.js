import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRoute';
import App from '../App';
import data from '../data';

describe('Testa o componente PokemonDetails', () => {
  const moreDetails = 'More details';
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const detailsTitle = getByText(`${data[0].name} Details`);
    const summary = getByText('Summary');
    const resume = getByText(data[0].summary);

    expect(detailsTitle).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  it('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const titleLocations = getByText(`Game Locations of ${data[0].name}`);
    expect(titleLocations).toBeInTheDocument();
    const img = getAllByAltText(`${data[0].name} location`);
    data[0].foundAt.forEach(({ location, map }, index) => {
      const text = getByText(location);
      expect(text).toBeInTheDocument();
      expect(img[index]).toBeInTheDocument();
      expect(img[index].src).toBe(map);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');

    expect(input.parentNode).toHaveTextContent('Pokémon favoritado?');

    userEvent.click(input);
    expect(input).toBeChecked();

    userEvent.click(input);
    expect(input).not.toBeChecked();
  });
});
