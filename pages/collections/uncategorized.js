import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nftAddress, nftMarketAddress } from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Article from '../../components/article';

const Uncategorized = () => {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded')
  
    useEffect(() => {
      loadNFTs();
    }, []);
  
    async function loadNFTs() {
      const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/bab89c57aa7f40f6860f59e271d12349');
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, provider);
  
      //
      const data = await marketContract.fetchMarketItems();
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
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
      }))
      const entries = items.filter(name => name.category === undefined)

      console.log('undefined here >>>', entries)
  
      setNfts(entries);
      setLoadingState('loading')
    }
  
    if(loadingState === 'loaded' && !nfts.length) return (
      <h1 className="px-20 py-10 text-3xl">No items in market place</h1>
    )
    return (
        <div>
          <Article nfts={nfts}  />
        </div>
    )
}

export default Uncategorized;