import fetch from 'node-fetch';
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

// Define las constantes TAPOS
const TAPOS = {
    blocksBehind: 3,
    expireSeconds: 30,
};

// Función para crear la instancia de API RPC
export function createApiRpc() {
    const privateKey = process.env.REACT_APP_WAX_PRIVATE_KEY;
    const endpoint = process.env.REACT_APP_WAX_ENDPOINT;

    if (!privateKey) {
        throw new Error("Missing WAX_PRIVATE_KEY");
    }

    if (!endpoint) {
        throw new Error("Missing WAX_ENDPOINT");
    }

    const signatureProvider = new JsSignatureProvider([privateKey]);

    const rpc = new JsonRpc(endpoint, {
        fetch,
    });

    const apiRpc = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
    });

    return apiRpc;
}

// Función para realizar una transacción
export function transact(actions) {
    const apiRpc = createApiRpc();
    return apiRpc.transact({ actions }, TAPOS);
}

export const transactNFT = async (userWallet, product) => {
  const author = 'app_wallet'; // Wallet de los creadores
  const schema = 'schema_name'; // Nombre del schema correspondiente
  const templateId = 'template_id'; // ID del template correspondiente

  try {
    await transact([
      {
        account: 'atomicassets',
        name: 'transfer',
        authorization: [
          {
            actor: author,
            permission: 'active'
          }
        ],
        data: {
          from: author,
          to: userWallet,
          asset_ids: [templateId],
          memo: `Transfer of ${product}`
        }
      }
    ]);
  } catch (error) {
    throw new Error('Transfer failed');
  }
};
