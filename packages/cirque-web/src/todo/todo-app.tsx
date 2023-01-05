import React from 'react';

import { ZChecklist } from './checklist/checklist';

import './todo-app.less';

/**
 * Represents the main entry point for the application.
 *
 * @returns
 *        The jsx to render the application.
 */
export function ZTodoApp() {
  return (
    <div className='ZTodoApp-root'>
      <ZChecklist name='today'></ZChecklist>
      <ZChecklist name='tomorrow'></ZChecklist>
    </div>
  );
}
