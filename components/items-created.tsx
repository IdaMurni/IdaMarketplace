import Image from 'next/Image';
import ItemSold from './items-sold';
export default function ItemsCreated({data}) {
    return (
        <>
            <div className="mt-10 py-10 border-t border-gray-300">
                <div className="flex flex-wrap ">
                    <div className="w-full lg:w-9/12 px-4">
                        {
                            data.nfts.map((nft, i) => (
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
                                </>
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