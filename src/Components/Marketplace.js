import React, { useState, useEffect } from 'react';
import Popup from './BuyPopup';
import Tile from './Tile';
// import Filter from './Filter';
import './Marketplace.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Marketplace = ({ searchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'Books');
        const snapshot = await getDocs(colRef);
        const fetchedEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Simulate a delay before setting loading to false
        setTimeout(() => {
          setEntries(fetchedEntries);
          setLoading(false);
        }, 1200); // Adjust the delay as needed
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBooks = entries.filter((entry) => {
    const query = (searchQuery || '').toString().toLowerCase();
    return (
      (entry.isbn && entry.isbn.toString().toLowerCase().includes(query)) ||
      entry.title.toLowerCase().includes(query) ||
      entry.author.toLowerCase().includes(query)
    );
  });

  const handleOpenPopup = (entry) => {
    setIsOpen(true);
    setSelectedEntry(entry);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="marketplace">
      {loading ? (
        <div className="loading-animation"></div>
      ) : filteredBooks.length > 0 ? (
        filteredBooks.map((entry) => (
          <Tile key={entry.id} entry={entry} onClick={handleOpenPopup} />
        ))
      ) : (
        <div className="no-results">No results found...</div>
      )}
      {isOpen && <Popup entry={selectedEntry} onClose={handleClosePopup} />}
    </div>
  );
};

export default Marketplace;
