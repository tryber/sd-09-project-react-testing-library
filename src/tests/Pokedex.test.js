import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente Pokedex.js', () => {
  it('A página deve ter um heading h2 com o texto encountered pokemons',
    () => {
    // acessa o elemento
      renderWithRouter(<App />);
      const encounteredText = screen.getByText('Encountered pokémons', {
        level: 2,
        name: /encountered pokémons/i,
      });

      // faça o teste
      expect(encounteredText).toBeInTheDocument();
    });
});

describe('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
  () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      // acessa o elemento
      renderWithRouter(<App />);
      const btnNextPoke = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      // faça o teste
      expect(btnNextPoke).toBeInTheDocument();
    });

    it('Os pokémons devem ser mostrados um a um, ao clicar sucessivamente no botão',
      () => {
      // acessa o elemento
        renderWithRouter(<App />);
        const pokeImg = screen.getAllByRole('img');
        const nextButton = screen.getByTestId('next-pokemon');
        // teste
        fireEvent.click(nextButton);
        expect(pokeImg).toHaveLength(1);
      });

    it('O primeiro Pokémon deve ser mostrado, depois de clicar próximo no último',
      () => {
      // acessa o elemento
        renderWithRouter(<App />);
        const nextButton = screen.getByTestId('next-pokemon');
        expect(nextButton).toBeInTheDocument();
        const pokemon1 = screen.getByTestId('pokemon-name');

        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        expect(pokemon1.textContent).toBe('Dragonair');

        fireEvent.click(nextButton);
        expect(pokemon1.textContent).toBe('Pikachu');

        // Consultei o repositório da coleg Sabrina para chegar a conclusãodesse teste
        //  https://github.com/tryber/sd-09-project-react-testing-library/pull/22/commits/856ffbdb84f2312e79784ec4910ac8b63d96d0a5
      });

    it('Teste se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);
      const pokeImg = screen.getAllByRole('img');
      // teste
      expect(pokeImg).toHaveLength(1);
    });
  });

describe('Sobre botões de filtro', () => {
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    // acessa o elemento
    renderWithRouter(<App />);
    const btnAll = screen.getByText('All');
    const btnTypes = screen.getAllByTestId('pokemon-type-button');
    // teste
    btnTypes.forEach((btnType) => {
      expect(btnType).toBeInTheDocument();
    });
    expect(btnAll).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão aparece o tipo selecionado e pikachu em All', () => {
    renderWithRouter(<App />);
    // localiza o botão do tipo psíquico
    const PsychicBtn = screen.getByRole('button', {
      name: /Psychic/i,
    });
    // dispara o evento de click no botão
    userEvent.click(PsychicBtn);
    // ao clicar no botão o pokemon que deve aparecer é o alakazam
    expect(screen.getByText('Alakazam').textContent).toBe('Alakazam');
    // localiza o botão All
    const btnAll = screen.getByText('All');
    // Usa o evento de click no botão All
    userEvent.click(btnAll);
    // seleciona o botão com texto Pikachu
    const pikachu = screen.getByText('Pikachu');
    // espera que o pikachu apareça depois do botão All ser clicado
    expect(pikachu).toBeInTheDocument();
  });

  // Contei com o auxílio do colega Layo Kaminski para fazer o teste acima. Me auxiliou me explicando o textContent e como usar
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });
});

describe('', () => {
  it('Teste se  os botão de filtro são criados de forma dinâmica', () => {
    renderWithRouter(<App />);
    // Array dos tipos de pokémon
    const typesOfPokemons = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      // ForEach que vai percorrer todo o array e conferir se o nome do botão corresponde ao tipo
    typesOfPokemons.forEach((type) => {
      const typePokemon = screen.getByRole('button', { name: type });
      // faz a verificação já que o forEach não retorna nada
      expect(typePokemon).toBeInTheDocument();
    });
    // Verifica se todos os botões estão lá
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => expect(button).toBeInTheDocument());
  });
  // consultei o repositório do colega Chistofer para fazer esse último teste
  // https://github.com/tryber/sd-09-project-react-testing-library/pull/56
});
