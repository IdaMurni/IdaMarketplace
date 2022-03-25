import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Article from '../../components/article';
import { Item } from '../../models/Item.interface';
import getItemData from '../../utils/items';


const GameCards = () => {
    const [nfts, setNfts] = useState([]);
  
    useEffect(() => {
      loadNFTs();
    }, []);
  
    async function loadNFTs(): Promise<void> {
      const rpcConnect = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/' + process.env.INFURA_KEY);
      const items: Item[]  = await getItemData(rpcConnect);
      const entries = items.filter(name => name.category === 'card')
      setNfts(entries);
    }
  
    if(nfts.length === 0) return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-black md:text-2xl lg:text-2xl">No Item</p>
      </div>
    )
    return (
        <div>
          <Article nfts={nfts} />
        </div>
    )
}

export default GameCards;