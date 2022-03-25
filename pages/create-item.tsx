import {useState } from 'react'
import { useForm } from 'react-hook-form';
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const uri: string = 'https://ipfs.infura.io:5001/api/v0';
const client = ipfsHttpClient(uri);

interface MetaData {
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

import {
    nftAddress,nftMarketAddress
} from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { EtherscanProvider } from '@ethersproject/providers'
import Breadcrumbs from '../components/breadcrumbs';
import Image from 'next/Image'


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ name: '', price: '', category: '', description:''})
    const router = useRouter();

    async function onChange(e) {
        const file = e.target.files[0]
        console.log('file >>>', file)
        try{ //try uploading the file
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            //file saved in the url path below
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        }catch(e){
            console.log('Error uploading file: ', e)
        }
    }


    //List item for sale
    async function createSale(url){
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        //sign the transaction
        const signer = provider.getSigner();
        let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
        let transaction = await contract.createToken(url);
        let tx = await transaction.wait()

        //get the tokenId from the transaction that occured above
        //there events array that is returned, the first item from that event
        //is the event, third item is the token id.
        console.log('Transaction: ',tx)
        console.log('Transaction events: ', transaction)
        console.log('tx >>', tx)
        let event = tx.events[0]
        console.log('event >>', event)
        let value = event.args[2]
        let tokenId = value.toNumber() //we need to convert it a number

        //get a reference to the price entered in the form 
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

        //get the listing price
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(
            nftAddress, tokenId, price, {value: listingPrice }
        )

        await transaction.wait()

        router.push('/')

    }

    const product = {
        breadcrumbs: [
          { id: 1, name: 'Create item', href: '/create-item' },
        ],
        highlights: [
          'Gold 70%',
          'Single Fighter',
          'Two Katanas',
          'Power 70%',
        ],
    
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        price: Yup.string()
            .required('Price is required'),
        category: Yup.string()
            .required('category is required'),
        description: Yup.string()
            .required('description is required'),
        Asset: Yup.string()
            .required('Asset is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    console.log('error >>', errors)

    async function onSubmit(data: MetaData) {

        const payload = JSON.stringify({
            name: data.name,
            category: data.category,
            price: data.price,
            description: data.description,
            image: fileUrl
        });


        try{
            const added = await client.add(payload)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
            createSale(url)
        }catch(error){
            console.log(`Error uploading file: `, error)
        }

        return false;
    }

    return (
        <>
        <div className="pl-4 pt-10 mb-10">
            <Breadcrumbs data={product} />
        </div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
            <div className="flex flex-wrap -mx-3 mb-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name
                    </label>
                    <p className="text-rose-600 text-xs italic">{errors.name?.message}</p>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text"
                        placeholder="Asset Name"
                        {...register('name')}
                        onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    />
                    
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price
                    </label>
                    <p className="text-rose-600 text-xs italic">{errors.price?.message}</p>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="number"
                        placeholder="Price"
                        {...register('price')}
                        onChange={e => updateFormInput({...formInput, price: e.target.value})}
                    />
                    
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Category
                    </label>
                    <p className="text-rose-600 text-xs italic">{errors.category?.message}</p>
                    <select 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Category of the asset"
                        {...register('category')}
                        onChange={e => updateFormInput({...formInput, category: e.target.value})}
                    >
                        <option value=""></option>
                        <option value="global">Global NFT</option>
                        <option value="card">Card NFT</option>
                        <option value="book">Book NFT</option>
                    </select>
                    
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Description
                    </label>
                    <p className="text-xs italic text-rose-600">{errors.description?.message}</p>
                    <textarea 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        placeholder="sort Description about the asset"
                        {...register('description')}
                        onChange={e => updateFormInput({...formInput, description: e.target.value})}
                    />
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Upload
                    </label>
                    <input type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    name="Asset"
                    {...register('Asset')}
                    onChange={onChange}/>
                    <p className="text-xs italic text-rose-600">{errors.Asset?.message}</p>
                    {
                        fileUrl && (
                            
                            <Image
                            src={fileUrl}
                            alt="Picture of the author"
                            className="rounded mt-4"
                            width={350}
                            height={400} 
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                            />
                        )
                    }
                    
                </div>
                <div className="w-full px-4 py-3 text-right sm:px-6">
                    <button 
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >Create NFT</button>
                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}