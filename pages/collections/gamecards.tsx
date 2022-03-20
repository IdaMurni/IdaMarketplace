import { useEffect, useState } from 'react';
import Article from '../../components/article';
import Items from '../../utils/items';


const GameCards = () => {
    const [nfts, setNfts] = useState([]);
  
    useEffect(() => {
      loadNFTs();
    }, []);
  
    async function loadNFTs(): Promise<void> {
      const items  = await Items();

      console.log('items >>>', items)
      const entries = items.filter(name => name.category === 'card')

      console.log('entries >>>', entries)
  
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