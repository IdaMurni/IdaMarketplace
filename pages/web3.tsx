import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks/network";
import { toHex, truncateAddress } from "./networks/utils/util";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./networks/utils/providerOptions";

let web3Modal;

if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
    });
}

export default function Home() {
  const [provider, setProvider]: any = useState();
  const [library, setLibrary]: any = useState();
  const [account, setAccount]: any = useState();
  const [signature, setSignature] = useState("");
  const [error, setError]:any = useState("");
  const [chainId, setChainId]: any = useState();
  const [network, setNetwork]: any = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified]: any = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <>
    <div>
        { !account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : <Button onClick={disconnect}>Disconnect</Button> }

        <p>Connect Status:
                {account ? (
                    <span>🟢  Connected</span>
                ) : <span>⚪️  Logged out</span> }
        </p>
        <p>Account: {truncateAddress(account)}</p>
        <p>Network ID: {chainId ? chainId : "No Network"}</p>

        {account && (
            <div>
                <Button onClick={switchNetwork} isDisabled={!network}>
                    Switch Network
                </Button>
                <Select placeholder="Select network" onChange={handleNetwork}>
                    <option value="3">Ropsten</option>
                    <option value="4">Rinkeby</option>
                    <option value="42">Kovan</option>
                    <option value="80001">Mumbai</option>
                </Select>

                <Button onClick={signMessage} isDisabled={!message}>
                  Sign Message
                </Button>
                <Input
                  placeholder="Set Message"
                  maxLength={20}
                  onChange={handleInput}
                  w="140px"
                />

                <Button onClick={verifyMessage} isDisabled={!signature}>
                     Verify Message
                </Button>
                {verified !== undefined ? (
                  verified === true ? (
                    <p> 🟢 Signature Verified!</p>
                  ) : (
                    <p> ⚪️  Signature Denied!
                    </p>
                  )
                ) : null}
            </div>
        )}

        <h3>{error ? error.message : null}</h3>
    </div>
    </>
  );
}
