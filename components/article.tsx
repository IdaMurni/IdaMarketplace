import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/Image'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { nftAddress, nftMarketAddress } from '../config';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Article = ({nfts}) => {
  const [loadingState, setLoadingState] = useState('not-loaded')
    async function buyNFT(nft) {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const network = await provider.getNetwork();
  
        try {
          if (network.chainId === 80001){
            //signed trans
            const signer = provider.getSigner();
            const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

            //set the price
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
            console.log('price', price)
            //make sale
            const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
              value: price
            });

            console.log('transactions >>', transaction)

            await transaction.wait();
          } 
            MySwal.fire({
              title: `Failed!!`,
              text: 'Please connect to Polygon Network',
              icon: 'error',
              confirmButtonText: 'Cool'
          })

        } catch (errors) {
            console.log('error', errors)
            MySwal.fire({
                title: `Error!`,
                text: errors && errors.data ? errors.data.message : errors.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        
        // nfts
        setLoadingState('loading')
      }

    return(
        <>
        <div className="mt-8">
            <div className="max-w-2xl mx-auto px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {nfts.map((nft, i) => (
                  <div key={i} className="border shadow-lg rounded shadow-gray-200">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <Link 
                        href={{
                          pathname: `/collections/${nft.tokenId.toString()}`,
                          query: nft
                        }}
                        >
                          <a>
                            <Image
                              src={nft.image}
                              alt={nft.name}
                              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                              width={300}
                              height={500}
                            />
                          </a>
                      </Link>
                    </div>
                    <div className="p-2 mt-2 flex justify-between">
                      <div>
                       <h3 className="uppercase mb-2">{nft.name}</h3>
                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-purple-600 bg-purple-200 uppercase">
                            {nft.category ? nft.category : 'Uncategorized'}
                        </span>
                        <p className="mt-5 truncate overflow-hidden w-32 text-sm text-gray-500">{nft.description}</p>
                      </div>
                    </div>
                    <div className="border-t mt-4 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-flow-row">
                      <div className="text-center p-2">
                        <p className="text-sm font-medium text-gray-900">
                            <img src="/polygon.png" className="inline-block align-middle mr-2" width={20} height={20} />
                            <span className="inline-block align-middle">{nft.price} </span>
                        </p>
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
        </>
    )
}

export default Article;