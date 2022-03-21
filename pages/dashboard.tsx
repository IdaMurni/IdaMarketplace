import { useEffect, useState } from "react";
import Image from 'next/Image'
import axios from 'axios'
import {Button, Select} from '@chakra-ui/react';
import { networkParams } from "./networks/network";
import { toHex, truncateAddress } from "./networks/utils/util";
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
const MySwal = withReactContent(Swal)
const robohashAvatars = require("robohash-avatars");


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
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, library)
      const data = await marketContract.fetchItemsCreated()
      
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
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

  const getAvatar = (address: string) => {
    robohashAvatars.generateAvatar({   
      username: address, 
      background: robohashAvatars.BackgroundSets.RandomBackground1,
      characters: robohashAvatars.CharacterSets.Kittens,
      height: 400,
      width: 400
    });
  }

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
              <button onClick={disconnect}
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Disconnect
              </button>
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
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                          <div className="relative">
                            <img
                              alt="..."
                              src= { account 
                                ? robohashAvatars.generateAvatar({   
                                username: account, 
                                background: robohashAvatars.BackgroundSets.RandomBackground1,
                                characters: robohashAvatars.CharacterSets.Robots,
                                height: 400,
                                width: 400
                              }) : 'polygon.png'
                            
                            }
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                              style={{ maxWidth: "150px" }}
                            />
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                22
                              </span>
                              <span className="text-sm text-gray-500">Friends</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                10
                              </span>
                              <span className="text-sm text-gray-500">Photos</span>
                            </div>
                            <div className="lg:mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                89
                              </span>
                              <span className="text-sm text-gray-500">Comments</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                          Jenna Stones
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                          {account ? (
                              <span>Network: {chainId} 🟢  Connected</span>
                            
                          ) : <span>⚪️  Logged out</span> }
                          <span className="block">{account}</span>
                        </div>
                      </div>
                      <div className="mt-10 py-10 border-t border-gray-300">
                        <div className="flex flex-wrap ">
                          <div className="w-full lg:w-9/12 px-4">
                            {
                              nfts.map((nft, i) => (
                                <>
                                  <div key={i} className="border shadow-lg rounded shadow-gray-200">
                                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                      <Image
                                          src={nft.image}
                                          alt={nft.name}
                                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                          width={300}
                                          height={500}
                                          // blurDataURL="data:..." automatically provided
                                          // placeholder="blur" // Optional blur-up while loading
                                        />
                                    </div>
                                    <div className="p-2 mt-2 flex justify-between">
                                        <div>
                                          <h3>{nft.name}</h3>
                                          <p className="truncate overflow-hidden w-32 mt-1 text-sm text-gray-500">{nft.description}</p>
                                          <p className="text-sm font-medium text-gray-900">
                                            <img src="/polygon.png" className="inline-block align-middle mr-2" width={20} height={20} />
                                            <span className="inline-block align-middle">{nft.price} </span>
                                          </p>
                                        </div>
                                    </div>
                                  </div>

                                  <div className="px-4">
                                    {
                                      Boolean(sold.length) && (
                                        <div>
                                          <h2 className="text-2xl py-2">Items sold</h2>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                            {
                                              sold.map((nft, i) => (
                                                <div key={i} className="border shadow-lg rounded shadow-gray-200">
                                                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                                  <Image src={nft.image}
                                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                                    width={300}
                                                    height={500}  />
                                              <div className="p-2 mt-2 flex justify-between">
                                                <div>
                                                  <h3>{nft.name}</h3>
                                                  <p className="truncate overflow-hidden w-32 mt-1 text-sm text-gray-500">{nft.description}</p>
                                                  <p className="text-sm font-medium text-gray-900">
                                                    <img src="/polygon.png" className="inline-block align-middle mr-2" width={20} height={20} />
                                                    <span className="inline-block align-middle">{nft.price} </span>
                                                  </p>
                                                </div>
                                              </div>
                                                </div>
                                                </div>
                                              ))
                                            }
                                          </div>
                                        </div>
                                      )
                                    }
                                  </div>
                                </>
                              ))
                            }
                          </div>
                        </div>
                      </div>
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
