import React, { useState } from 'react';
import './Css/NpcMarketplace.css'; // Asegúrate de crear y personalizar este archivo CSS
import { db } from '../Firebase/firebase.js'; // Asegúrate de importar y configurar firestore
import { transactNFT } from './Js/waxBlockchain'; // Asegúrate de crear esta función

const productPrices = {
  amber: 500,
  jade: 500,
  pearl: 500,
  turquoise: 500,
  amethyst: 1000,
  diamond: 1000,
  opal: 1000,
  ruby: 1000,
  topaz: 1000,
  sapphire: 1000,
  'black diamond': 3000,
  'star ruby': 3000,
  nanodiamond: 10000,
  peridots: 10000
};

const NpcMarketplace = ({ userId, userWallet, userCoins }) => {
  const [dialog, setDialog] = useState('Welcome to the NFT Marketplace! What would you like to do?');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = (product) => {
    if (userCoins < productPrices[product]) {
      setDialog('You do not have enough coins.');
    } else {
      setSelectedProduct(product);
      setIsBuying(true);
      setDialog(`You are about to buy ${product} for ${productPrices[product]} coins. Do you want to proceed?`);
    }
  };

  const confirmPurchase = async () => {
    try {
      // Lógica de transferencia del NFT
      await transactNFT(userWallet, selectedProduct);

      // Registrar la transacción en Firestore
      await db.collection('transactions').add({
        wallet_origen: 'app_wallet', // La wallet de los creadores
        wallet_destino: userWallet,
        monto: productPrices[selectedProduct],
        memo: `Purchase of ${selectedProduct}`
      });

      setDialog('Transaction successful! You have purchased ' + selectedProduct);
      setIsBuying(false);
      setSelectedProduct(null);
      // Lógica para actualizar el balance de coins del usuario
    } catch (error) {
      setDialog('Transaction failed. Please try again.');
      setIsBuying(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="npc-marketplace">
      <div className="npc-background">
        <img src="https://i.imgur.com/JfsumFl.gif" alt="NPC Background" />
        <div className="dialog-box">
          <p>{dialog}</p>
          {isBuying ? (
            <div>
              <button onClick={confirmPurchase}>Yes</button>
              <button onClick={() => setIsBuying(false)}>No</button>
            </div>
          ) : (
            <div>
              {Object.keys(productPrices).map((product, index) => (
                <button key={index} onClick={() => handleBuy(product)}>
                  Buy {product} for {productPrices[product]} coins
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NpcMarketplace;
