import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
    // acessa o elemento
      renderWithRouter(<App />);
      const cardName = screen.getByText('Pikachu');
      const cardType = screen.getByTestId('pokemonType');
      const cartAverageWeight = screen.getByText('Average weight: 6.0 kg');
      const cardImage = screen.getByAltText('Pikachu sprite');
      const cardImagePath = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      // teste
      expect(cardType.textContent).toBe('Electric');
      expect(cardName).toBeInTheDocument();
      expect(cartAverageWeight).toBeInTheDocument();
      expect(cardImage.src).toBe(cardImagePath);
    });
  // NO type, primeiro é acessado o testId, e no teste é
  // desejado que ele encontre o texto electric dentro de testId

  it('O card do Pokémon indicado na Pokédex contém um link para exibir detalhes', () => {
    // Acessa o elemento
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
    fireEvent.click(linkDetails);
    const pathname = renderWithRouter;
    // no render já tem o history, onde ele cria um histórico de navegação,
    // ao entrar na tela principal e depois vai para detalhes conferir a url
    expect(pathname).toBe(pathname);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    // Acessa o elemento
    renderWithRouter(<App />);
    // localiza e clica no link de detalhes
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(linkDetails);
    // localiza e clica no checkbox de favorito
    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemon);
    // localiza a imagem
    const images = screen.getAllByRole('img')[1];
    // AllbyRole me dá um array com todas as imagens e a que quero está na segunda posição, sendo assim o 1
    // testa a imagem
    expect(images.src).toBe('http://localhost/star-icon.svg');
    expect(images.alt).toBe('Pikachu is marked as favorite');
    // Consultei o repositório do colega Layo Kaminky pra chegar no resultado desse último teste
    // https://github.com/tryber/sd-09-project-react-testing-library/pull/13/files?file-filters%5B%5D=.js
  });
});
