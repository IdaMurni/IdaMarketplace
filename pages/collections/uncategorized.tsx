import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nftAddress, nftMarketAddress } from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Article from '../../components/article';

const Uncategorized = () => {
    const [nfts, setNfts] = useState([]);
  
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
      const entries = items.filter(name => name.category === 'global')
  
      setNfts(entries);
    }
    
    if(nfts.length === 0) return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-black md:text-2xl lg:text-2xl">No Item</p>
        </div>
      )

    return (
        <div>
          <Article nfts={nfts}  />
        </div>
    )
}

export default Uncategorized;