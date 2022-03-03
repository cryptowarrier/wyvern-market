import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import { address } from '../constants/addresses';
import { network } from '../constants/network';
import ERC721 from '../contracts/ERC721A/ERC721AMock.sol/ERC721AMock.json';
import ERC20 from '../contracts/TestERC20.sol/TestERC20.json';
import TokenCard from './common/TokenCard';

const OfferPage = ({ account }) => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  useEffect(() => {
    async function getCollection() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
        const contract = new ethers.Contract(address['erc721A'], ERC721.abi, provider);
        if (!!account) {
          const erc20 = new ethers.Contract(address['erc20'], ERC20.abi, provider);
          const balance20 = await erc20.balanceOf(account);
          setBalance(formatEther(balance20));
        }
        const totalSupply = await contract.totalSupply();
        let tokenIdList = [];
        for (let i = 0; i < Number(totalSupply); i++) {
          const owner = await contract.ownerOf(i);
          tokenIdList.push({
            id: i,
            owner: owner
          });
        }
        setTokens(tokenIdList);
      } catch (err) {
        console.log(err);
      }
    }

    getCollection();
  }, [account]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-5">
        {
          tokens.map(token => (
            <TokenCard id={token.id} key={token.id} owner={token.owner} account={account} />
          ))
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className=""></div>
        <div className="bg-indigo-400 border border-white rounded-md w-full text-white p-5 grid grid-cols-2 gap-4">
          <div>ERC20</div>
          <div></div>
          <div>Balance</div>
          <div>{balance}</div>
          <div>NFT ID</div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>

  )
}

export default OfferPage;