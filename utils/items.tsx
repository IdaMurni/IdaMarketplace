import axios from "axios";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config";
import { Item } from "../models/Item.interface";
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default async function Items(): Promise<Item[]> {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/bab89c57aa7f40f6860f59e271d12349');
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, provider);

    const data: any = await marketContract.fetchMarketItems();
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
    
    return items;
}