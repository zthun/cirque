import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZTodoApp } from './todo/todo-app';

const container = createRoot(document.getElementById('zthunworks-circus')!);

container.render(
  <React.StrictMode>
    <ZTodoApp />
  </React.StrictMode>
);
