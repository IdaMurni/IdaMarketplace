import axios from "axios";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config";
import { Item } from "../models/Item.interface";
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Web3Modal from "web3modal";
import { providerOptions } from "../pages/networks/utils/providerOptions";
let web3Modal;

if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
    });
}

const dataItem = async (data:any, tokenContract: any): Promise<Item[]> => {
  const items: Item[] = await Promise.all(data.map(async i => {
    const tokenUri = await tokenContract.tokenURI(i.tokenId);
    const meta = await axios.get(tokenUri);
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item: Item = {
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
  }));
  return items
}

const getItemData = async (rpcProfider: any, signer?: any): Promise<Item[]> => {
  const provider = await web3Modal.connect();
  const library: any = new ethers.providers.Web3Provider(provider);
  let marketContract: ethers.Contract;
  let data: any;
  const tokenContract = new ethers.Contract(nftAddress, NFT.abi, rpcProfider);
  if (signer) {
    marketContract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    data = await marketContract.fetchItemsCreated()
    return await dataItem(data, tokenContract);
  }
  
  marketContract = new ethers.Contract(nftMarketAddress, Market.abi, rpcProfider);

  data = await marketContract.fetchMarketItems();
  const items = await dataItem(data, tokenContract);
  return items;
}

export default getItemData;