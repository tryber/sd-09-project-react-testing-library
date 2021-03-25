import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testa os botões de navegação do App', () => {
  it('Testa botão Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeBtn = getByText(/Home/i);
    expect(homeBtn).toBeInTheDocument();
  });

  it('Testa botão About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutBtn = getByText(/About/i);
    expect(aboutBtn).toBeInTheDocument();
  });

  it('Testa botão Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoritePokemonsBtn = getByText(/Favorite Pokémons/i);
    expect(favoritePokemonsBtn).toBeInTheDocument();
  });

  describe('Testes de navegação', () => {
    it('Testa se o botão Home leva para a página inicial', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/');
      const homeText = getByText(/Encountered pokémons/i);
      expect(homeText).toBeInTheDocument();
    });

    it('Testa rota About', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/about');
      const aboutText = getByText(/About Pokédex/i);
      expect(aboutText).toBeInTheDocument();
    });

    it('Testa rota Favorite pokémons', () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/favorites');
      const aboutText = getByRole('heading', {
        level: 2,
        name: 'Favorite pokémons',
      });
      expect(aboutText).toBeInTheDocument();
    });

    it('Testa rota não existente', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/fakeRoute');
      const aboutText = getByText(/Page requested not found/i);
      expect(aboutText).toBeInTheDocument();
    });
  });
});
