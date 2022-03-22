import Image from 'next/Image';
import { useState } from 'react';

export default function ItemSold({itemSold}) {
    if(itemSold.length === 0) return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-black md:text-2xl lg:text-2xl">No Item sold yet!</p>
        </div>
      )
    return(
        <>
            <div className="px-4">
                {
                    Boolean(itemSold.length) && (
                    <div>
                        <h2 className="text-2xl py-2">Items sold</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        {
                            itemSold.map((nft, i) => (
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
    )
}