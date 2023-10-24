import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: true },
//   { id: 3, description: 'Charger', quantity: 1, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  const totalItems = items.reduce((sum, curItem) => sum + curItem.quantity, 0);
  const packedItems = items.reduce(
    (acc, curItem) => (curItem.packed ? acc + curItem.quantity : acc),
    0
  );
  const percents = Math.round((packedItems / totalItems) * 100);

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function checkItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onCheck={checkItem}
      />
      <Stats
        totalItems={totalItems}
        packedItems={packedItems}
        percents={percents}
      />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function createItem(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={createItem}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onCheck }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheck={onCheck}
          />
        ))}
      </ul>
      <div className='actions'>
        <select>
          <option>Filter by quantity</option>
          <option></option>
          <option></option>
        </select>
        <button>Clear list</button>
      </div>
    </div>
  );
}

function Item({ itemObj, onDeleteItem, onCheck }) {
  const { quantity, description, packed, id } = itemObj;
  return (
    <li>
      <input
        type='checkbox'
        value={packed}
        onChange={() => onCheck(id)}
      ></input>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

function Stats({ totalItems, packedItems, percents }) {
  return (
    <footer className='stats'>
      <em>
        🧳 You have {totalItems} items on your list, and you already packed{' '}
        {packedItems} ({percents ? percents : 0}%)
      </em>
    </footer>
  );
}

export default App;
