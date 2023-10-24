import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ data: '', name: '' });
  const [editItem, setEditItem] = useState({ id: '', data: '', name: '' });

  const fetchData = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };
  const handleGetItemById = async () => {
    const itemId =1
    const response = await fetch(`/api/items?id=${itemId}`);
    if (response.status === 200) {
      const data = await response.json();
      // setItemById(data);
    } else {
      // setItemById(null);
    }
  };

  const handleCreateItem = async () => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    if (response.status === 201) {
      setNewItem({ data: '', name: '' });
      fetchData();
    }
  };

  const handleEditItem = async () => {
    const response = await fetch('/api/items', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editItem),
    });
    if (response.status === 200) {
      setEditItem({ id: '', data: '', name: '' });
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>NeDB Item Service</h1>
      <h2>Items</h2>
      <ul>
        {items.map((item:any) => (
          <li key={item._id}>
            {item.data} - {item.name}
          </li>
        ))}
      </ul>
      <h2>Create Item</h2>
      <input
        type="text"
        placeholder="Data"
        value={newItem.data}
        onChange={(e) => setNewItem({ ...newItem, data: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <button onClick={handleCreateItem}>Create</button>

      <h2>Edit Item</h2>
      <input
        type="text"
        placeholder="Data"
        value={editItem.data}
        onChange={(e) => setEditItem({ ...editItem, data: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={editItem.name}
        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
      />
      <input
        type="hidden"
        value={editItem.id}
        onChange={(e) => setEditItem({ ...editItem, id: e.target.value })}
      />
      <button onClick={handleEditItem}>Edit</button>
    </div>
  );
}
