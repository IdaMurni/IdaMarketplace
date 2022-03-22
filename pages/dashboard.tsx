import { useEffect, useState } from "react";
import Image from 'next/Image'
import axios from 'axios'
import {Button, Select} from '@chakra-ui/react';
import { networkParams } from "./networks/network";
import { toHex } from "./networks/utils/util";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./networks/utils/providerOptions";
import {
  nftMarketAddress, nftAddress
} from '../config'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Breadcrumbs from '../components/breadcrumbs';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Item } from "../models/Item.interface";
import Profile from "../components/profile";
import ItemsCreated from "../components/items-created";
// import {NFTItems} from "../components/items-created";
const MySwal = withReactContent(Swal)
const robohashAvatars = require("robohash-avatars");

interface UserProfile {
  userAccount: string;
  avatar: any;
  chainId: number;
  logout: () => void
}


let web3Modal;

if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
    });
}

export default function Dashboard() {
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
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded');



  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner()
      // const itemCreated = await NFTItems(library);
      
      
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();

      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, library)
      const data = await marketContract.fetchItemsCreated()
      
      const items: Item[] = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item: Item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          category: meta.data.category
        }
        return item
      }))

      /* create a filtered array of items that have been sold */
      const soldItems = items.filter(i => i.sold)
      setSold(soldItems)
      setNfts(items)
      setLoadingState('loaded')
    } catch (error) {
      console.log('error >>>', error)
      setError(error);
      MySwal.fire({
        title: `Error!`,
        text: `Please connect to Polygon network`,
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const switchNetwork = async () => {
    try {
      const changeNetwork = await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
      console.log('changeNetwork >>>', changeNetwork);
      console.log('ChainId >>>', toHex(network));
      changeNetwork;
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

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  
  const product = {
    breadcrumbs: [
      { id: 1, name: 'Dashboard', href: '/dashboard' },
    ],
    highlights: [
      'Gold 70%',
      'Single Fighter',
      'Two Katanas',
      'Power 70%',
    ],

  }

  const dataProfile: UserProfile = {
    userAccount: account,
    avatar: robohashAvatars,
    chainId: chainId,
    logout: disconnect
  }

  const NFTsItems = {
    nfts: nfts,
    sold: sold
  }

  return (
    <>
      <div>
        <div className="pl-4 pt-10 mb-10">
          <Breadcrumbs data={product} />
        </div>
        { !account ? (
              <button onClick={connectWallet}
              className="bg-green-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Connect Wallet
            </button>
            ) : 
            <>
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
              </div>
              <div className="relative block" style={{ height: "300px" }}>
                        
              </div>
              <div className="relative py-16">
                <div className="mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 -mt-64">
                    <div className="px-6">
                      <Profile data={dataProfile} />
                      <ItemsCreated data={NFTsItems} />
                    </div>
                  </div>
                </div>
              </div>
            </>           
        }
      </div>
    </>
  );
}
