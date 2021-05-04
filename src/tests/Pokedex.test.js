import React from 'react';
import { fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  describe('Testa do botão próximo pokémon', () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      const { getByRole } = renderWithRouter(<App />);

      const button = getByRole('button', { name: 'Próximo pokémon' });
      expect(button).toBeInTheDocument();
    });

    it('Teste se os próximos Pokémons são mostrados um a um', () => {
      const { getByText, queryAllByRole } = renderWithRouter(<App />);

      const button = getByText('Próximo pokémon');

      const pokémon = queryAllByRole('p', { name: 'Pikachu' });

      pokémon.forEach((index, nextPokemon) => {
        fireEvent.click(button);
        expect(index !== nextPokemon).toBeInTheDocument();
      });
    });

    it('O primeiro item deve ser mostrado se estiver no último item da lista', () => {
      const { queryAllByRole, getByTestId } = renderWithRouter(<App />);

      const button = getByTestId('next-pokemon');

      const pokemon = queryAllByRole('p', { name: 'Pikachu' });

      if (pokemon[8]) {
        fireEvent.click(button);
        expect(pokemon).toBe([1]);
      }
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {});

  describe('Testa se a Pokédex tem os botões de filtro.', () => {
    it('Testando se os filtros mostram apenas os pokémons do tipo certo', () => {});

    it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;', () => {});
  });

  describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All;', () => {});

    it('Mostra os Pokémons sem filtros quando o botão All for clicado;', () => {});

    it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {});
  });

  describe('Cria dinamicamente um botão de filtro para cada tipo de Pokémon.', () => {
    it('Os botões de filtragem devem ser dinâmicos;', () => {});
    it('Testa se existe um botão para cada tipo de pokémon', () => {});
    it('Mostra um botão de tipo e o botão All deve permanecer na tela', () => {});
  });

  it('Desabilita o botão Próximo Pokémon quando a lista tiver apenas um Pokémon', () => {

  });
});
