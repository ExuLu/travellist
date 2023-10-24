export default function Item({ itemObj, onDeleteItem, onCheck }) {
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
