import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import axios from "axios";

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', `${process.env.REACT_APP_ENCLAVE_SDK_KEY}`);

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUser = async (username: string) => {
    const resp = await fetch(`${BASE_URL}/user?username=${username}`, {
        method: 'GET',
        headers: headers
    });

    return await resp.json();
}

export const createAccount = async (username: string) => {
    const resp = await fetch(`${BASE_URL}/v3/webauthn/register/generate-options?username=${username}`, {
        method: 'GET',
        headers: headers
    });

    let attResp;
    try {
        const opts = await resp.json();
        console.log("Resitration Options: ", opts);
        attResp = await startRegistration(opts);
    } catch (error) {
        throw error;
    }

    console.log("\n\nattResp: ", attResp);

    const verificationResp = await fetch(`${BASE_URL}/v3/webauthn/register/verify?username=${username}&deployWallet=true`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(attResp)
        });

    const verificationJSON = await verificationResp.json();

    console.log("verificationJSON: ", JSON.stringify(verificationJSON, null, 2));
    return verificationJSON;
}

export const signInAccount = async (username: string) => {
    const resp = await fetch(`${BASE_URL}/webauthn/authenticate/generate-options?username=${username}`, {
        method: 'GET',
        headers: headers
    });

    let attResp;
    try {
        const opts = await resp.json();
        console.log("Resitration Options: ", opts);
        attResp = await startAuthentication(opts);
    } catch (error) {
        throw error;
    }

    console.log("\n\nattResp: ", attResp);

    const verificationResp = await fetch(`${BASE_URL}/webauthn/authenticate/verify?username=${username}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(attResp)
        }
    );

    const verificationJSON = await verificationResp.json();

    console.log("verificationJSON: ", JSON.stringify(verificationJSON, null, 2));
    return verificationJSON;
}

export enum QuoteType {
    AMOUNT_IN = "AMOUNT_IN",
    AMOUNT_OUT = "AMOUNT_OUT"
}

export const submitMultiTransaction = async (
    username: string, 
    transactionDetails: any[], 
    network: number, 
    orderData: {
        amount: string | number,
        type: QuoteType,
        limit?: string | number
    },
    label = undefined
) => {

    console.log("submitTransaction: ", username, transactionDetails, network);

    const resp = await fetch(`${BASE_URL}/v3/webauthn/transaction/generate-options`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
            username, 
            transactionDetails, 
            network, 
            gasMode: "ABSTRACTED_INTERNAL", 
            orderData,
            label, 
        })
    });

    let attResp;
    try {
        const opts = await resp.json();
        console.log("Resitration Options: ", opts);
        attResp = await startAuthentication(opts);
    } catch (error) {
        throw error;
    }

    console.log("\n\nattResp: ", attResp);

    const verificationResp = await fetch(`${BASE_URL}/v3/webauthn/transaction/verify?username=${username}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(attResp)
        });

    const verificationJSON = await verificationResp.json();

    console.log("verificationJSON: ", JSON.stringify(verificationJSON, null, 2));
    return verificationJSON;
}

export const getSmartBalance = async (walletAddress: string) => {
    const resp = await axios.get(`${BASE_URL}/v3/smartbalance/getbalance?walletAddress=${walletAddress}`, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `${process.env.REACT_APP_ENCLAVE_SDK_KEY}`
        },
    });

    return resp.data;
}

export const computeQuote = async (walletAddress: string, outputNetwork: number, amount: number | string, type: QuoteType, limit?: number | string ) => {
    const resp = await axios.post(`${BASE_URL}/v3/smartbalance/getquote`, { 
        walletAddress, 
        outputNetwork,
        amount,
        type,
        limit
     }, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `${process.env.REACT_APP_ENCLAVE_SDK_KEY}`
        },
    });

    return resp.data;
}

export const getMultiGasFees = async (walletAddress: string, transactionDetails: any[], network: number) => {
    const resp = await axios.post(`${BASE_URL}/v3/gas-fees`, { walletAddress, transactionDetails, network }, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `${process.env.REACT_APP_ENCLAVE_SDK_KEY}`
        },
    });

    return resp.data;
}

export const checkUserName = async (username: string) => {
    const resp = await fetch(`${BASE_URL}/api/user/check-username?username=${username}`, {
        method: 'GET',
        headers: headers
    });

    const result = await resp.json();
    return result;
}

export const updateGasConfig = async (username: string, gasConfig: string) => {
    const resp = await fetch(`${BASE_URL}/api/user/update-gas-config?username=${username}&mode=${gasConfig}`, {
        method: 'PUT',
        headers: headers
    });

    return await resp.json();
}

export const getTransactionList = async (username: string) => {
    const resp = await axios.get(`${BASE_URL}/api/transactions/list?username=${username}`, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `${process.env.REACT_APP_ENCLAVE_SDK_KEY}`
        },
    });

    return resp.data;
}

export const getExplorerUrl = (chainId: number) => {
    switch (chainId) {
        case 1:
            return "https://etherscan.io";
        case 137:
            return "https://polygonscan.com";
        case 8453:
            return "https://basescan.org/tx/";
        case 10:
            return "https://optimistic.etherscan.io/tx/";
        case 56:
            return "https://bscscan.com/tx/";
        case 42161:
            return "https://arbiscan.io/tx/";
        case 43114:
            return "https://snowtrace.io/tx/";
        default:
            return `https://scope.sh/${chainId}/tx/`;
    }
}