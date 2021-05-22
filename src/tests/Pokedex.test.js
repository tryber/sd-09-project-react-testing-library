import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste do component Pokedex', () => {
  it('Contém um texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(text).toBeInTheDocument();
  });

  const name = 'pokemon-name';

  it('clicando em next vem o próximo pokemon', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();
    const pokeName = screen.getByTestId(name);
    for (let index = 0; index < data.length; index += 1) {
      if (data[index] === data.length) {
        expect(pokeName).toHaveTextContent('Pikachu');
      }
      expect(pokeName).toHaveTextContent(data[index].name);
      userEvent.click(btnNext);
    }
  });

  it('Apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId(name);
    expect(pokemons).toHaveLength(1);
  });

  it('Botões de filtro', () => {
    renderWithRouter(<App />);
    const arrTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonsId = screen.getAllByTestId('pokemon-type-button');
    buttonsId.forEach((btn, index) => {
      expect(btn).toHaveTextContent(arrTypes[index]);
    });
  });

  it('All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
  });

  it('Botão próximo deve ser desabilitado', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[2]);
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn.disabled).toBe(true);
  });
});
