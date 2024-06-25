import React, { useState, useEffect, useContext } from 'react';
import './Css/NpcMarketplace.css';
import { db } from '../Firebase/firebase';
import { LoginUAL } from './LoginUAL';
import { transactNFT } from './Js/waxBlockchain';
import { UALContext } from 'ual-reactjs-renderer';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';

const NpcType = "Jewelry";

const gemsData = {
  amber: { price: 1, templateId: 795598 },
  jade: { price: 1, templateId: 795602 },
  pearl: { price: 1, templateId: 795606 },
  turquoise: { price: 1, templateId: 795611 },
  amethyst: { price: 16, templateId: 795599 },
  diamond: { price: 16, templateId: 795603 },
  opal: { price: 16, templateId: 795604 },
  ruby: { price: 16, templateId: 795607 },
  topaz: { price: 16, templateId: 795609 },
  sapphire: { price: 16, templateId: 795610 },
  'black diamond': { price: 48, templateId: 795600 },
  'star ruby': { price: 48, templateId: 795608 },
  nanodiamond: { price: 480, templateId: 795601 },
  peridots: { price: 480, templateId: 795605 },
};

const NpcMarketplace = () => {
  const ual = useContext(UALContext);
  const [dialog, setDialog] = useState([{ sender: 'npc', text: 'Welcome to the ' + NpcType + '! What would you like to do?' }]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [inventory, setInventory] = useState({});
  const [NPCinventory, setNPCInventory] = useState({});
  const [userCoins, setUserCoins] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (ual?.activeUser?.accountName) {
      fetchUserData(ual.activeUser.accountName);
    }
  }, [ual?.activeUser?.accountName]);

  const fetchUserData = async (userWallet) => {
    try {
      console.log(`Fetching data for user: ${userWallet}`);

      const userDocRef = collection(db, 'users');
      const q = query(userDocRef, where('wallet', '==', userWallet));
      const userDoc = await getDocs(q);

      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        setUserCoins(userData.SHCoins || 0);
        console.log("SHC0: " + userData.SHCoins);
        setIsWhitelisted(userData.whitelist || false);
        console.log("WL0: " + userData.whitelist);
        fetchUserInventory(userWallet);
        fetchNPCInventory('stickershub1');
      } else {
        console.log(`User document does not exist for wallet: ${userWallet}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInventory = async (wallet) => {
    const inventory = {};

    for (const [gem, { templateId }] of Object.entries(gemsData)) {
      const response = await fetch(`https://wax.api.atomicassets.io/atomicassets/v1/accounts?match_owner=${wallet}&collection_name=stickershub1&template_id=${templateId}&page=1&limit=1&order=desc`);
      const data = await response.json();
      const amount = data.data.length > 0 ? data.data[0].assets : 0;
      if (amount > 0) {
        inventory[gem] = amount;
      }
    }

    setInventory(inventory);
  };

  const fetchNPCInventory = async (wallet) => {
    const NPCinventory = {};

    for (const [gem, { templateId }] of Object.entries(gemsData)) {
      const response = await fetch(`https://wax.api.atomicassets.io/atomicassets/v1/accounts?match_owner=${wallet}&collection_name=stickershub1&template_id=${templateId}&page=1&limit=1&order=desc`);
      const data = await response.json();
      const amount = data.data.length > 0 ? data.data[0].assets : 0;
      if (amount > 0) {
        NPCinventory[gem] = amount;
      }
    }

    setNPCInventory(NPCinventory);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const newDialog = [{ sender: 'user', text: inputText }];
    setDialog(newDialog);
    processUserMessage(inputText);
    setInputText('');
  };

  const processUserMessage = (message) => {
    let response = '';
    if (message.toLowerCase() === 'hi') {
      response = 'Welcome, esteemed patron. I am Frederic the Jeweler. What exquisite treasures can I assist you with today? Would you like to buy or sell?';
    } else if (message.toLowerCase() === 'buy') {
      response = 'Ah, a connoisseur of fine craftsmanship. Allow me to present the exquisite treasures I have to offer:<br>';
      Object.keys(gemsData).forEach(product => {
        if (NPCinventory[product] > 0) {
          response += `<br>${product} - Price: ${gemsData[product].price} SHCoins.`;
        }
      });
      response += '<br><br>Which one would you like to buy?';
    } else if (gemsData[message.toLowerCase()]) {
      const product = message.toLowerCase();
      setSelectedProduct(product);
      setIsBuying(true);
      response = `You are about to buy ${product} for ${gemsData[product].price} SHCoins. <br> Do you want to proceed? Type 'yes' to confirm.`;
    } else if (isBuying && message.toLowerCase() === 'yes') {
      confirmPurchase();
      return; // Exit early to prevent further processing
    } else {
      response = 'I do not understand. Please say "hi" to start a conversation.';
    }
    setDialog([{ sender: 'npc', text: response }]);
  };

  const confirmPurchase = async () => {
    if (userCoins < gemsData[selectedProduct]) {
      setDialog([{ sender: 'npc', text: 'You do not have enough SHCOINS to make this purchase.' }]);
      return;
    }

    try {
      await transactNFT(ual.activeUser.accountName, selectedProduct);

      const transactionsCol = collection(db, 'transactions');
      await addDoc(transactionsCol, {
        wallet_origen: 'wallet-GemsNPC',
        wallet_destino: ual.activeUser.accountName,
        monto: gemsData[selectedProduct],
        memo: `Purchase of ${selectedProduct}`,
        date: new Date(),
      });

      setUserCoins(userCoins - gemsData[selectedProduct]);

      setDialog([{ sender: 'npc', text: `You have successfully purchased ${selectedProduct}.` }]);
      setIsBuying(false);
    } catch (error) {
      console.error('Error during transaction:', error);
      setDialog([{ sender: 'npc', text: 'There was an error processing your transaction. Please try again later.' }]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isWhitelisted) {
    return (
      <div className="npc-marketplace">
        <div className="npc-background">
          <div className="dialog-box">
            <p>You are not whitelisted to access this marketplace.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fondo">
      <div className="npc-marketplace">
        <LoginUAL onLogin={(wallet) => fetchUserData(wallet)} />
        <div className="npc-background">
          <div className="dialog-box">
            {dialog.map((entry, index) => (
              <p key={index} className={`dialog-${entry.sender}`} dangerouslySetInnerHTML={{ __html: entry.text }} />
            ))}
          </div>
          <div className='input-zone'>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              ⬆
            </button>
          </div>
          <div className="inventory-container">
            <div className="inventory-item">
              <h3>Your Inventory</h3>
              <ul>
                {Object.entries(inventory).map(([gem, amount]) => (
                  <li key={gem}>{gem}: {amount}</li>
                ))}
              </ul>
            </div>
            <div className="inventory-item">
              <h3>{NpcType} Inventory</h3>
              <ul>
                {Object.entries(NPCinventory).map(([gem, amount]) => (
                  <li key={gem}>{gem}: {amount}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NpcMarketplace;
