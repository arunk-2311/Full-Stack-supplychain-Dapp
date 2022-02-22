/* pages/index.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useEthers, useContractFunction } from "@usedapp/core";
import CPCB from "../src/chain-info/contracts/CPCB.json"
import networkMapping from "../src/chain-info/deployments/map.json"

export default function Home() {
  const { activateBrowserWallet, account } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  const [peerAdded, setPeerAdded] = useState(undefined);
  const [fromPincode, setFromPincode] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [toPincode, setToPincode] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [type, setType] = useState(undefined);
  let ownerState = (account === '0xefaAE999c2F779BA9344A3a51d196601dBb8dDBa');
  let [ownership, setOwnership] = useState(ownerState);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  useEffect(() => {
    let ownerState = (account === '0xefaAE999c2F779BA9344A3a51d196601dBb8dDBa');
    setOwnership(ownerState);
    console.log(ownership, account)
  }, [account]);


  async function connect() {
    activateBrowserWallet();
  }

  const contractAddress = networkMapping['4']['CPCB'][0];
  const contractABI = CPCB["abi"];
  const contract = new ethers.Contract(contractAddress, contractABI);

  const { send: addingPeer, state: isPeerAdded } = useContractFunction(contract, "addPeer", {
    transactionName: "adding Peer",
  });

  useEffect(() => {
    console.log(`State: ${isPeerAdded.status}`);
  }, [isPeerAdded])

  const { send: addCode, state: isCodeAdded } = useContractFunction(contract, "_allotCode", {
    transactionName: "alloting transfer code",
  });

  useEffect(() => {
    console.log(`State: ${isCodeAdded.status}`);
  }, [isCodeAdded])

  function ownerHome(res) {

    if (res) {
      return (
        <div className="flex justify-center px-10 py-10">
          <input
            type="text"
            placeholder="Enter account Address"
            onChange={(e) => setPeerAdded(e.target.value)}
          />
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => addingPeer(peerAdded)}>
            Add Peers!
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="flex justify-center px-10 py-10">
            <input
              type="text"
              placeholder="Enter from pincode"
              onChange={(e) => setFromPincode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter category of plastic"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter To pincode"
              onChange={(e) => setToPincode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter weight of plastic"
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter type of plastic"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="flex justify-center px-2 py-2 whitespace-nowrap">
            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => addCode(fromPincode, category, toPincode, weight, type)}>
              Add your transfer details
            </button>
          </div>
        </div>
      )
    }
  }

  return (

    <div >
      <div className="flex justify-center px-6 py-4 whitespace-nowrap">
        {hasMetamask ? (
          account ?
            (<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
              {account}
            </button>
            ) : (
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => connect()}>
                Connect
              </button>

            )
        ) : (
          "Please install metamask"
        )}

      </div>
      {account ? (
        ownerHome(ownership)
      ) : ""
      }
    </div >
  );
}
