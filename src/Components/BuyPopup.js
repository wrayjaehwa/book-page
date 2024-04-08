import React from 'react';
import './BuyPopup.css';
import {collection, deleteDoc, getDocs, doc, getFirestore, getDoc} from 'firebase/firestore';
import {firestore, colRefBooks, auth} from '../firebase';


const Popup = ({ entry, onClose }) => {
  const { imgurl, price, title, author, condition, summary, id, email } = entry;
  
  let conditionClass;
  switch (condition) {
    case 'new':
      conditionClass = 'new';
      break;
    case 'used':
      conditionClass = 'used';
      break;
    case 'poor':
      conditionClass = 'poor';
      break;
    default:
      conditionClass = '';
  }

  const handleContactSeller = async () => {
    try {
      const base = 'mailto:' + email;
      const subject = '?subject=Offer from Book Bazaar';
      const msg =
        "&body=I'm interested in buying your copy of " +
        title +
        ' via Book Bazaar!';

      const docSnapshot = await getDoc(doc(firestore, 'Books', id));

      if (docSnapshot.exists()) {
        await deleteDoc(doc(firestore, 'Books', id));
        window.open(base + subject + msg);
        console.log('Entry deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      } else {
        console.log('Document does not exist in the Firestore database');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleDeleteListing = async () => {
    try {
      const docSnapshot = await getDoc(doc(firestore, 'Books', id));

      if (docSnapshot.exists()) {
        await deleteDoc(doc(firestore, 'Books', id));
        console.log('Entry deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log('Document does not exist in the Firestore database');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="popup-image">
            <img src={imgurl} alt="Product" />
          </div>
          <div className="popup-details">
            <h3>{title}</h3>
            <h2>by {author} </h2>
            <h3>
              ${price}{' '}
              <span className={`condition ${conditionClass}`}>{condition}</span>
            </h3>
            <p>{email}</p>
            <textarea
              className="summary-text"
              value={summary}
              placeholder="Summary"
              readOnly={true}
              style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
            ></textarea>
            {auth.currentUser.email === email && (
                <button style={{ background:'red' }} onClick={handleDeleteListing} >Delete Listing</button>
            )}
            {!auth.currentUser || auth.currentUser.email !== email && (
              <button className="contact-button" onClick={handleContactSeller}>Contact Seller</button>
            )}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
