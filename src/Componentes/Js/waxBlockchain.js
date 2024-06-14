import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { TextEncoder, TextDecoder } from 'text-encoding'; // Usar text-encoding para la compatibilidad en el navegador
import fetch from 'node-fetch';

// Define las constantes TAPOS
const TAPOS = {
  blocksBehind: 3,
  expireSeconds: 30,
};

const privateKey = process.env.REACT_APP_WAX_PRIVATE_KEY;
const endpoint = process.env.REACT_APP_WAX_ENDPOINT;

const rpc = new JsonRpc(endpoint, { fetch });
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

export const transactNFT = async (userWallet, product) => {
  const author = 'stickershub1';
  const templateId = getTemplateId(product); // Implementa esta función para obtener el ID de la plantilla basado en el producto

  try {
    await api.transact({
      actions: [{
        account: 'atomicassets',
        name: 'transfer',
        authorization: [{
          actor: author,
          permission: 'active',
        }],
        data: {
          from: author,
          to: userWallet,
          asset_ids: [templateId],
          memo: `Transfer of ${product}`,
        },
      }],
    }, TAPOS);
  } catch (error) {
    throw new Error('Transfer failed');
  }
};

const getTemplateId = (product) => {
  const templateIds = {
    amber: '795598',
    jade: '795602',
    pearl: '795606',
    turquoise: '795611',
    amethyst: '795599',
    diamond: '795603',
    opal: '795604',
    ruby: '795607',
    topaz: '795609',
    sapphire: '795610',
    'black diamond': '795600',
    'star ruby': '795608',
    nanodiamond: '795601',
    peridots: '795605',
  };
  return templateIds[product];
};
