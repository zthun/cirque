import { get } from 'lodash';
import React, { FormEvent } from 'react';

export interface IZChecklistItem {
  value: string;

  onValueChange: (next: string) => void;
}

/**
 * Represents a checklist item.
 *
 * @param props -
 *        The properties for this checklist.
 *
 * @returns
 *        The jsx to render this component.
 */
export function ZChecklistItem(props: IZChecklistItem) {
  const { value, onValueChange } = props;

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = get(e.target, 'value')!;
    onValueChange(value);
  };

  return (
    <li className='ZChecklistItem-root'>
      <input value={value} onInput={handleInputChange} />
    </li>
  );
}
