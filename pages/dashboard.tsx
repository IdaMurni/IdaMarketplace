import { useEffect, useState } from "react";
import { networkParams } from "./networks/network";
import { toHex } from "./networks/utils/util";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./networks/utils/providerOptions";
import Breadcrumbs from '../components/breadcrumbs';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Item } from "../models/Item.interface";
import Profile from "../components/profile";
import ItemsCreated from "../components/items-created";
import getItemData from "../utils/items";
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
  const [error, setError]:any = useState("");
  const [chainId, setChainId]: any = useState();
  const [network, setNetwork]: any = useState();
  const [nfts, setNfts]: any = useState([]);
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded');



  const connectWallet = async () => {
    try {
      const connection = await web3Modal.connect();
      const provider: any = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const items: Item[] = await getItemData(provider, signer);
      
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();

      setProvider(provider);
      setLibrary(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

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
      connectWallet();
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

  if (loadingState === 'loaded' && !nfts.length) return (
      <>
        <div className="py-20 flex items-center justify-center">
          <p className="text-2xl text-black md:text-2xl lg:text-2xl antialiased">200 | Please Create entries to see your Dashboard</p>
        </div>
      </>
    )
  
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
      <div className="pl-4 pt-10 mb-10">
        <Breadcrumbs data={product} />
      </div>
      { !account ? (
          <div className="text-center py-16">
            <button onClick={connectWallet}
              className="bg-green-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Connect Wallet
            </button>
          </div>
        ) : 
        <>
          <div className="md:w-2/5 sm:w-full col-end-7 col-span-2">
            <div className="px-4 py-3 text-right sm:px-6">
              <label className="block text-sm font-medium text-gray-700">Network</label>
              <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Select network" onChange={handleNetwork}>
                  <option value="3">Ropsten</option>
                  <option value="4">Rinkeby</option>
                  <option value="42">Kovan</option>
                  <option value="80001">Mumbai</option>
              </select>   
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button onClick={switchNetwork} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Switch Network</button>
            </div>    
          </div>
          { chainId == 80001 ?
            (<>
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  {/* Left side */}
                  <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <Profile data={dataProfile} />
                  </div>

                  {/* Right side */}
                  <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                    <ItemsCreated data={NFTsItems} /> 
                  </div>
                </div>
              </>
            ): (
              <div className="py-20 flex items-center justify-center">
                <p className="text-2xl text-black md:text-2xl lg:text-2xl antialiased">200 | Please Connect to Polygon Network!</p>
              </div>
            )
          }
        </>
      }
    </>
  );
}
