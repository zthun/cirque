import { startCase } from 'lodash-es';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { ZChecklistItem } from './checklist-item';

import './checklist.less';

interface IZCheckItem {
  id: string;
  value: string;
}

export interface IZChecklist {
  name?: string;
}

/**
 * Represents a checklist where items can be added and removed.
 *
 * @param props -
 *        The properties for the checklist.
 *
 * @returns
 *        The jsx to render the checklist.
 */
export function ZChecklist(props: IZChecklist) {
  const { name } = props;
  const title = startCase(name);
  const [items, setItems] = useState<IZCheckItem[]>([]);

  const renderBody = () => {
    if (!items.length) {
      return (
        <div className='ZChecklist-empty'>
          <span>There are currently no items in the list. Click the Add button to add one.</span>
        </div>
      );
    }

    const handleItemChange = (index: number, newValue: string) => {
      const next = items.slice();
      next[index] = {
        ...next[index],
        value: newValue
      };
      setItems(next);
    };

    const renderItem = (item: IZCheckItem, index: number) => (
      <ZChecklistItem key={item.id} value={item.value} onValueChange={handleItemChange.bind(null, index)} />
    );

    return <ul className='ZChecklist-items'>{items.map(renderItem)}</ul>;
  };

  const renderFooter = () => {
    const handleAdd = () => {
      const next = items.slice();
      next.push({
        id: v4(),
        value: '(What do you want to do?)'
      });
      setItems(next);
    };

    return (
      <button className='ZChecklist-footer-add-button' name='add' onClick={handleAdd}>
        Add
      </button>
    );
  };

  return (
    <div className='ZChecklist-root' data-name={name}>
      <header className='ZChecklist-header'>
        <h2>{title}</h2>
      </header>
      <div className='ZChecklist-body'>{renderBody()}</div>
      <footer className='ZChecklist-footer'>{renderFooter()}</footer>
    </div>
  );
}
