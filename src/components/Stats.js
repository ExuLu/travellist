export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className='stats'>
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const totalItems = items.reduce((sum, curItem) => sum + curItem.quantity, 0);
  const packedItems = items.reduce(
    (acc, curItem) => (curItem.packed ? acc + curItem.quantity : acc),
    0
  );
  const percents = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percents === 100
          ? 'You got everything! Ready to go ✈️'
          : `🧳 You have ${totalItems} items on your list, and you already packed 
          ${packedItems} (${percents}%)`}
      </em>
    </footer>
  );
}
