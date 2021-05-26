import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requirement 2 - Testing component <About />', () => {
  test('tests if page contains two paragraphs', () => {
    render(<About />);
    // const paragraph1 = 'This application simulates a Pokédex'
    //   + ', a digital encyclopedia containing all Pokémons';
    // const paragraph2 = 'One can filter Pokémons by type'
    //   + ', and see more details for each one of them';
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    // expect(paragraphs[0].textContent).toBe(paragraph1);
    // expect(paragraphs[1].textContent).toBe(paragraph2);
  });

  test('tests if page contains information about Pokedex', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading', { level: 2 });
    expect(title.textContent).toBe('About Pokédex');
  });

  test('tests if there is an image of a Pokédex', () => {
    render(<About />);
    const imgAltText = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const renderedImg = document.querySelector('img');
    expect(renderedImg.src).toBe(imgAltText);
  });
});
