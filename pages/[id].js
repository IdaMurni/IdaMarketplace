import { ethers } from 'ethers';
import axios from 'axios';
import { nftAddress, nftMarketAddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';


export const getStaticPath = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/bab89c57aa7f40f6860f59e271d12349');
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, provider);

    const data = await marketContract.fetchMarketItems();
    const item = await Promise.all(data.map(async i => {
      return {
          params: { id: i.tokenId.toString()}
      }
    
    }))

    return {item, falback: false}
}

export const getStaticProps = async (context) => {
    const id = context.params.id
}

const Details = () => {
    const router = useRouter();

    const query = router.query;
    console.log('query >>>', query)
    return(
        <>
            <h1>hallo</h1>
        </>
    )
}


export default Details