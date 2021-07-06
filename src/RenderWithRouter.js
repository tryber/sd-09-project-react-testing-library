import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

/* Função retorna tanto o componente que passamos como parâmetro, já encapsulado no router,
quanto o histórico que geramos em si, o que também serve para nos levar a outras páginas
com facilidade. */

const renderWithRouter = (component) => {
  const history = createMemoryHistory(); // cria um novo history (para limpar nos testes)
  return ({
    ...render(<Router history={history}>{component}</Router>), history, // history vem como parâmetro
  });
};

export default renderWithRouter;
