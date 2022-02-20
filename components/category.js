import React from "react";
import Image from 'next/Image'
function Categories() {
    return(
        <div className="mt-20 mb-32">
            <div className="max-w-7xl mx-auto mb-20 px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Categories
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                        accusamus quisquam.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-10 flex items-center">
                <div></div>
                <div>
                    <div className="py-5">
                        <div>
                            <Image
                            src="/NFTs/samurai_warior.jpg"
                            alt=""
                            className="object-cover h-48 w-96 rounded"
                            width={300}
                            height={500}
                            />
                        </div>
                        <div className="mt-5 px-2 text-center">
                            <h3 className="text-violet-600 text-xl font-semibold">Uncategorized</h3>
                        </div>
                        <div className="pt-6 flex justify-between relative items-center w-full">
                            <div className="w-full border-b border-dashed border-gray-100 dark:border-gray-400" />
                        </div>
                        <div className="mt-4 flex flex-col w-full justify-center items-center">
                            <div className="mt-5 px-2 flex items-center w-full">
                                <div>
                                    <p className="text-xs text-gray-800">NFTs Sold</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">857</p>
                                </div>
                                <div className="ml-14">
                                    <p className="text-xs text-gray-800">Total Entries</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">7698</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="py-5">
                        <div>
                            <Image
                            src="/NFTs/samurai_01.jpg"
                            alt=""
                            className="object-cover h-48 w-96 rounded"
                            width={300}
                            height={500}
                            />
                        </div>
                        <div className="mt-5 px-2 text-center">
                            <h3 className="text-violet-600 text-xl font-semibold">GameCard</h3>
                        </div>
                        <div className="pt-6 flex justify-between relative items-center w-full">
                            <div className="w-full border-b border-dashed border-gray-100 dark:border-gray-400" />
                        </div>
                        <div className="mt-4 flex flex-col w-full justify-center items-center">
                            <div className="mt-5 px-2 flex items-center w-full">
                                <div>
                                    <p className="text-xs text-gray-800">NFTs Sold</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">857</p>
                                </div>
                                <div className="ml-14">
                                    <p className="text-xs text-gray-800">Total Entries</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">7698</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="py-5">
                        <div className="bg-violet-300">
                            <Image
                            src="/NFTs/gaisha.jpg"
                            alt=""
                            className="object-cover h-48 w-96 rounded"
                            width={300}
                            height={500}
                            />
                        </div>
                        <div className="mt-5 px-2 text-center">
                            <h3 className="text-violet-600 text-xl font-semibold">Books</h3>
                        </div>
                        <div className="pt-6 flex justify-between relative items-center w-full">
                            <div className="w-full border-b border-dashed border-gray-100 dark:border-gray-400" />
                        </div>
                        <div className="mt-4 flex flex-col w-full justify-center items-center">
                            <div className="mt-5 px-2 flex items-center w-full">
                                <div>
                                    <p className="text-xs text-gray-800">NFTs Sold</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">857</p>
                                </div>
                                <div className="ml-14">
                                    <p className="text-xs text-gray-800">Total Entries</p>
                                    <p className="text-sm leading-none text-center text-gray-800 dark:text-violet-600 mt-1">7698</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div></div>
            </div>
        </div>
    )
}

export default Categories;