import React, { useState } from 'react';

import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import { ethers } from 'ethers';
import ERC721 from '../contracts/ERC721A/ERC721AMock.sol/ERC721AMock.json';
import { address } from '../constants/addresses';

const MintPage = ({ account }) => {
  const [uri, setUri] = useState('');

  const requestMint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address['erc721A'], ERC721.abi, signer);
      const mintTx = await contract.safeMint(account, 1, uri);
      await mintTx.wait();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div className="border border-white m-48 p-12 bg-blue-500 rounded-md">
        <div className='m-6'>
          <Input
            value={uri}
            onChange={e => setUri(e.target.value)}
            type="text"
            color="orange"
            size="regular"
            outline={true}
            placeholder="uri"
          />
        </div>
        <div className="m-6">
          <Button
            onClick={requestMint}
            color="orange"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
          >
            Mint
          </Button>
        </div>
      </div>
    </div>
  )
}


export default MintPage;
