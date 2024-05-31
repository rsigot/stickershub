// MissionGameMint.js

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

// Función asincrónica para realizar el minteo de un NFT
async function mintNFT(value, userId) {
    const author = process.env.REACT_APP_WAX_ACCOUNT;
    const owner = userId;

    if (!author) {
        throw new Error("Missing WAX_ACCOUNT");
    }

    const templateId = value.template;
    const schema = value.schema;

    if (!templateId) {
        throw new Error("Missing TEMPLATE_ID");
    }

    try {
        await transact([
            {
                account: "atomicassets",
                name: "mintasset",
                authorization: [
                    {
                        actor: author,
                        permission: "active",
                    },
                ],
                data: {
                    authorized_minter: author,
                    collection_name: 'stickershub1',
                    schema_name: schema,
                    new_asset_owner: owner,
                    template_id: templateId,
                    immutable_data: [],
                    mutable_data: [],
                    tokens_to_back: [],
                },
            },
        ]);

        console.log("New Asset created OK! " + templateId);
        alert("Claim OK!: " + templateId);
        return true;

    } catch (error) {
        console.error("Error minting NFT:", error);
        return false;
    }
}


// Función para realizar minteo de múltiples NFTs
export async function nuevoMint(rewards, userId) {
    const results = await Promise.allSettled(rewards.map(value => mintNFT(value, userId)));
    
    // Puedes procesar los resultados aquí si lo necesitas
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Minting successful for reward ${index}:`, result.value);
        } else {
            console.error(`Minting failed for reward ${index}:`, result.reason);
        }
    });
}


// Exporta la función MissionGameMint como un componente React
export function MissionGameMint() {
    return (
        <>
            {/* Aquí puedes poner tu JSX si es necesario */}
        </>
    );
}

export default MissionGameMint;
