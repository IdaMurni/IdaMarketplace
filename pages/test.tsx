import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/Image'
import Breadcrumbs from '../components/breadcrumbs';
import {
    nftMarketAddress, nftAddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function Test() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal(
    //     {
    //   network: "mainnet",
    //   cacheProvider: true,
    // }
    )
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
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
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <div>
      <div className="pl-4 pt-10 mb-10">
        <Breadcrumbs data={product} />
      </div>

      <div className="px-10">
        <h2 className="text-2xl py-2">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
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
            ))
          }
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
    </div>
  )
}