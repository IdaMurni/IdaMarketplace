import { ethers } from 'ethers';
import { nftAddress, nftMarketAddress } from '../../config';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

import {useRouter} from "next/router";
import { StarIcon } from '@heroicons/react/solid'
import Web3Modal from 'web3modal';
import Breadcrumbs from '../../components/breadcrumbs';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Image from 'next/Image'
const MySwal = withReactContent(Swal)

const Details = () => {
    const { query } = useRouter();
  
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
          //make sale
          const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
              value: price
          });
      
          await transaction.wait();
        } 

        MySwal.fire({
          title: `Failed!!`,
          text: 'Please connect to Polygon Network',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      } catch(errors) {
        MySwal.fire({
            title: 'Error!',
            text: errors && errors.data ? errors.data.message : errors.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })  
      }
    }

    const product = {
        name: `${query.name}`,
        price: `${query.price}`,
        href: '#',
        breadcrumbs: [
          { id: 1, name: 'Collections', href: '/collections' },
          { id: 2, name: (query.category !== '') ? query.category : 'Uncategorized', href: '/collections' },
        ],
        description: `${query.description}`,
        highlights: [
          'Gold 70%',
          'Single Fighter',
          'Two Katanas',
          'Power 70%',
        ],

    }
    const reviews = { href: '#', average: 4, totalCount: 117 }
    
    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }
      

    return (
        <div className="bg-white">
          <div className="pt-6">
            <Breadcrumbs data={product} />
    
            {/* Product info */}
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <Image
                    src={query.image}
                    className="object-contain w-full rounded shadow-md"
                    width={300}
                    height={400}
                />
              </div>
    
              {/* Options */}
              <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                <h2 className="sr-only">Product information</h2>
                <p className="text-sm font-medium text-gray-900">
                    <img src="/polygon.png" className="inline-block align-middle mr-2" width={30} height={30} />
                    <span className="inline-block align-middle text-3xl text-gray-900">{product.price} </span>
                </p>
    
                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>
    
                  <button
                    onClick={() => buyNFT(query)}
                    className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Buy NFT
                  </button>


                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>
                        {/* Description and details */}
                        <div>
                        <h3 className="sr-only">Description</h3>
            
                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>
                    </div>
        
                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            
                        <div className="mt-4">
                            <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                            {product.highlights.map((highlight) => (
                                <li key={highlight} className="text-gray-400">
                                <span className="text-gray-600">{highlight}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
        
                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">Details</h2>
            
                        <div className="mt-4 space-y-6">
                        <ul className="pl-4 list-disc text-sm space-y-2 text-gray-400">
                            <li>Contract Address: 0x9ACe64aB9f6fBFF6EC876275b00Dd7780088C2d7</li>
                            <li>Seller: {query.seller}</li>
                            <li>name: {query.name}</li>
                            <li>tokenId: {query.tokenId}</li>
                        </ul>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}


export default Details