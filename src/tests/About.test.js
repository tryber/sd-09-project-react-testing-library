import React from 'react';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const page = screen.getByText(/About Pokédex/);
    expect(page).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });
  // test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  //   const { history } = renderWithRouter(<App />);

  //   fireEvent.click(screen.getByText(/About/i));

  //   const { pathname } = history.location;

  //   expect(pathname).toBe('/about');

  //   const paragraph = screen.getAllByRole(<p />);
  //   expect(paragraph).toBeInTheDocument();
  //   expect(paragraph.length).toBe(2);
  // });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const imagePoke = screen.getByAltText(/Pokédex/i);
    expect(imagePoke).toBeInTheDocument();
    expect(imagePoke.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
