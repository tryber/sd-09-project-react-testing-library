import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWhithRouter from '../components/RenderWithRouter';
import { About } from '../components';
import App from '../App';

test('Teste se a página contém as informações sobre a Pokédex.',
  () => {
    const { history } = renderWhithRouter(<App />);

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(aboutLink);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/about');

    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

test('Teste se a página contém um heading h2 com o texto `About Pokédex.`',
  () => {
    renderWhithRouter(<About />);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading2).toBeInTheDocument();
  });

test('Teste se a página contém a seguinte imagem de uma Pokédex.',
  () => {
    renderWhithRouter(<About />);
    const imageContens = screen.getByRole('img');
    expect(imageContens).toBeInTheDocument();
    expect(imageContens.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
