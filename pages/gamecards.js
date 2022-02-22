import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { nftAddress, nftMarketAddress } from '../config';
import Link from 'next/link'
import Image from 'next/Image'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const GameCards = () => {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded')
  
    useEffect(() => {
      loadNFTs();
    }, []);
  
    async function loadNFTs() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/bab89c57aa7f40f6860f59e271d12349');
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, provider);
  
      //
      const data = await marketContract.fetchMarketItems();
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          category: meta.data.category
        }
        return item;
      }))

      console.log('items >>>', items)
      const entries = items.filter(name => name.category === 'card')

      console.log('entries >>>', entries)
  
      setNfts(entries);
      setLoadingState('loading')
    }
  
    async function buyNFT(nft) {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
  
      //signed trans
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
  
      //set the price
      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
      //make sale
      const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
        value: price
      });
  
      await transaction.wait();
      loadNFTs()
    }
  
    if(loadingState === 'loaded' && !nfts.length) return (
      <h1 className="px-20 py-10 text-3xl">No items in market place</h1>
    )
    return (
        <div>
          <div className="mt-8">
            <div className="max-w-2xl mx-auto px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {nfts.map((nft, i) => (
                  <div key={i} className="border shadow-lg rounded shadow-gray-200">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        width={300}
                        height={500}
                      />
                    </div>
                    <div className="p-2 mt-4 flex justify-between">
                      <div>
                        <h3>{nft.name}</h3>
                        <p className="truncate overflow-hidden w-32 mt-1 text-sm text-gray-500">{nft.description}</p>
                      </div>
                    </div>
                    <div className="border-t mt-4 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-flow-row">
                      <div className="text-center p-2">
                        <p className="text-sm font-medium text-gray-900">{nft.price} MATIC</p>
                      </div>
                      <div>
                        <button className="w-full bg-violet-500 text-white py-2 px-12 rounded-r-sm"
                      onClick={() => buyNFT(nft)}>Buy</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    )
}

export default GameCards;