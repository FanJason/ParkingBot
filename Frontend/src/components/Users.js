import React, { useState, useEffect } from 'react';
import '../App.css';

function Users() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch("urllink");
        const items = await data.json();
        setItems(items.items);  
        console.log(data);
    };

  return (
    <div>
    </div>
  );
}

export default Users; 