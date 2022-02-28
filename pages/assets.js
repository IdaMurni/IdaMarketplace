import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/Image'

import {
    nftMarketAddress, nftAddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function Assets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // const web3Modal = new Web3Modal({
    //   network: "mainnet",
    //   cacheProvider: true,
    // })
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
    <>
    <div>
      <div className="p-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="max-w-xl rounded-lg shadow-md lg:flex md:flex shadow-grey-600">
                <img
                  className="object-cover w-full md:w-1/2 lg:w-1/3 rounded"
                  src={nft.image}
                  alt="image"
                />
                <div className="px-6 pt-2 pb-2 pl-5 pr-5 text-center">
                  <h3 className="uppercase mb-2">{nft.name}</h3>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-purple-600 bg-purple-200 uppercase">
                      {nft.category ? nft.category : 'Uncategorized'}
                  </span>

                  <div className="text-center p-2">
                    <p className="text-sm font-medium text-gray-900">
                        <img src="/polygon.png" className="inline-block align-middle mr-2" width={20} height={20} />
                        <span className="inline-block align-middle">{nft.price} </span>
                    </p>
                  </div>

                  <div>
                    <button className="w-full bg-violet-500 text-white py-2 px-12 rounded-r-sm"
                  onClick={() => buyNFT(nft)}>Details</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}