import React, { useState, useEffect } from 'react';
import '../App.css';

function User({ match }) {

    useEffect(() => {
        fetchItem();
    }, []);

    const [item, setItem] = useState({});

    const fetchItem = async () => {
    };

  return (
    <div>
        <h1>User</h1>
    </div>
  );
}

export default User; 