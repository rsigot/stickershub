import React, { useState, useEffect, useContext } from 'react';
import './Css/NpcMarketplace.css';
import { db } from '../Firebase/firebase';
import { LoginUAL } from './LoginUAL';
import { transactNFT } from './Js/waxBlockchain';
import { UALContext } from 'ual-reactjs-renderer';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const productPrices = {
  amber: 1,
  jade: 1,
  pearl: 1,
  turquoise: 1,
  amethyst: 16,
  diamond: 16,
  opal: 16,
  ruby: 16,
  topaz: 16,
  sapphire: 16,
  'black diamond': 48,
  'star ruby': 48,
  nanodiamond: 480,
  peridots: 480,
};

const NpcMarketplace = () => {
  const ual = useContext(UALContext);
  const [dialog, setDialog] = useState([{ sender: 'npc', text: 'Welcome to the NFT Marketplace! What would you like to do?' }]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [inventory, setInventory] = useState({});
  const [userCoins, setUserCoins] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (ual?.activeUser?.accountName) {
      fetchUserData(ual.activeUser.accountName);
    }
  }, [ual?.activeUser?.accountName]);

  const fetchUserData = async (userWallet) => {
    try {
      console.log(`Fetching data for user: ${userWallet}`);
      const userDocRef = doc(db, 'users', userWallet);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        setUserCoins(userData.coins);
        setIsWhitelisted(userData.whitelist);
        fetchUserInventory(userWallet);
      } else {
        console.log(`User document does not exist for wallet: ${userWallet}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserInventory = async (userWallet) => {
    // Implementar la lógica para obtener el inventario de NFTs del usuario
    // Aquí podrías usar una función para interactuar con la blockchain y obtener los NFTs del usuario
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const newDialog = [...dialog, { sender: 'user', text: inputText }];
    setDialog(newDialog);
    processUserMessage(inputText);
    setInputText('');
  };

  const processUserMessage = (message) => {
    let response = '';
    if (message.toLowerCase() === 'hi') {
      response = 'Welcome, esteemed patron. I am Frederic the Jeweler. What exquisite treasures can I assist you with today? Would you like to buy or sell?';
    } else if (message.toLowerCase() === 'buy') {
      response = 'Ah, a connoisseur of fine craftsmanship. Allow me to present the exquisite treasures I have to offer:';
      Object.keys(productPrices).forEach(product => {
        response += `\n${product} - Price: ${productPrices[product]} coins`;
      });
      response += '\nWhich one would you like to buy?';
    } else if (productPrices[message.toLowerCase()]) {
      const product = message.toLowerCase();
      setSelectedProduct(product);
      setIsBuying(true);
      response = `You are about to buy ${product} for ${productPrices[product]} coins. Do you want to proceed? Type 'yes' to confirm.`;
    } else if (isBuying && message.toLowerCase() === 'yes') {
      confirmPurchase();
      return; // Exit early to prevent further processing
    } else {
      response = 'I do not understand. Please say "hi" to start a conversation.';
    }
    setDialog([...dialog, { sender: 'npc', text: response }]);
  };

  const confirmPurchase = async () => {
    if (userCoins < productPrices[selectedProduct]) {
      setDialog([...dialog, { sender: 'npc', text: 'You do not have enough SHCOINS to make this purchase.' }]);
      return;
    }

    try {
      await transactNFT(ual.activeUser.accountName, selectedProduct);

      const transactionsCol = collection(db, 'transactions');
      await addDoc(transactionsCol, {
        wallet_origen: 'wallet-GemsNPC',
        wallet_destino: ual.activeUser.accountName,
        monto: productPrices[selectedProduct],
        memo: `Purchase of ${selectedProduct}`,
        date: new Date(),
      });

      setUserCoins(userCoins - productPrices[selectedProduct]);

      setDialog([...dialog, { sender: 'npc', text: `You have successfully purchased ${selectedProduct}.` }]);
      setIsBuying(false);
    } catch (error) {
      console.error('Error during transaction:', error);
      setDialog([...dialog, { sender: 'npc', text: 'There was an error processing your transaction. Please try again later.' }]);
    }
  };

  if (!isWhitelisted) {
    return (
      <div className="marketplace-container">
        <LoginUAL onLogin={(wallet) => fetchUserData(wallet)} />
        <p>You are not whitelisted to access this marketplace.</p>
      </div>
    );
  }

  return (
    <div className="marketplace-container">
      <LoginUAL onLogin={(wallet) => fetchUserData(wallet)} />
      <div className="dialog-container">
        {dialog.map((entry, index) => (
          <p key={index} className={`dialog-${entry.sender}`}>
            {entry.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
      <div className="inventory-container">
        <h3>Your Inventory</h3>
        {/* Renderiza el inventario del usuario aquí */}
      </div>
    </div>
  );
};

export default NpcMarketplace;
