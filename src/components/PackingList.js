import { useState } from 'react';
import Item from './Item';

export default function PackingList({ items, onDeleteItem, onCheck, onClear }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;
  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === 'status')
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheck={onCheck}
          />
        ))}
      </ul>
      <div
        className='actions'
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <select>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='status'>Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}
