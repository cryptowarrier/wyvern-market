import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { address } from '../constants/addresses';
import { network } from '../constants/network';
import ERC721 from '../contracts/ERC721A/ERC721AMock.sol/ERC721AMock.json';
import TokenCard from './common/TokenCard';

const OfferPage = ({account}) => {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    async function getCollection() {
      try{
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
        const contract = new ethers.Contract(address['erc721A'], ERC721.abi, provider);
        const totalSupply = await contract.totalSupply();
        let tokenIdList = [];
        for(let i = 0 ; i < Number(totalSupply) ; i++) {
          const owner = await contract.ownerOf(i);
          if(owner.toLowerCase() === String(account).toLowerCase()) {
            tokenIdList.push(i);
          }
        }
        setIds(tokenIdList);
      } catch (err) {
        console.log(err);
      }
    }

    getCollection();
  }, [account]);
  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      {
        ids.map(id => (
          <TokenCard id={id} key={id} />
        ))
      }
    </div>
  )
}

export default OfferPage;