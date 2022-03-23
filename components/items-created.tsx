import Image from 'next/Image';
import ItemSold from './items-sold';
export default function ItemsCreated({data}) {
    if(data.nfts.length === 0) return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-black md:text-2xl lg:text-2xl">No Item created yet!</p>
        </div>
      )
    return (
        <>
            <div className="pb-10 border-gray-300">
            <h3 className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-purple-600 bg-purple-200 uppercase mb-5">Created Items</h3>
                <div className="flex flex-wrap ">
                    <div className="grid grid-cols-4 gap-4">
                        {
                            data.nfts.map(nft => (
                                <div key={nft.image} className="border shadow-lg rounded shadow-gray-200">
                                    <div className="w-full min-h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md rounded-br-none rounded-bl-none overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none">
                                        <Image
                                            src={nft.image}
                                            alt={nft.name}
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                            width={300}
                                            height={500}
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
                    <div className="w-full lg:w-9/12 px-4">
                        <ItemSold itemSold={data.sold} />
                    </div>
                </div>
            </div>
        </>
    )
}