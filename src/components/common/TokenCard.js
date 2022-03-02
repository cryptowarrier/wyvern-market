import { useEffect, useState } from "react";
import { address } from '../../constants/addresses';
import { network } from '../../constants/network';
import ERC721 from '../../contracts/ERC721A/ERC721AMock.sol/ERC721AMock.json';
import { ethers } from 'ethers';

const TokenCard = ({id}) => {
  const [uri, setUri] = useState();

  useEffect(() => {
    async function getTokenId() {
      try{
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
        const contract = new ethers.Contract(address['erc721A'], ERC721.abi, provider);
        const tokenuri = await contract.tokenURI(id);
        setUri(tokenuri);
      } catch (err) {
        console.log(err);
      }
    }
    getTokenId();
  }, [id]);

  return (
    <div className="bg-indigo-800 border border-white rounded-md w-full h-48 text-white p-5">
      <div className="grid grid-cols-2 gap-4">
        <div>Id :</div>
        <div>{id}</div>
        <div>URI</div>
        <div>{uri}</div>
      </div>
    </div>
  )
}

export default TokenCard;