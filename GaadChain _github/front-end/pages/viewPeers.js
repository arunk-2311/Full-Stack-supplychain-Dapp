
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import CPCB from "../src/chain-info/contracts/CPCB.json"
import networkMapping from "../src/chain-info/deployments/map.json"

export default function showPeers() {
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [peerArray, setPeers] = useState([]);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
            let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(connectedProvider.getSigner());
        }
        viewAllPeers();
    }, [peerArray])

    async function viewAllPeers() {

        const abi = CPCB['abi'];
        const contractAddress = networkMapping['4']["CPCB"][0];
        const waste = new ethers.Contract(contractAddress, abi, signer);

        try {
            const peerArray = await waste.listAllPeers();
            console.log(peerArray)
            setPeers(peerArray);
        } catch (e) {
            console.log(e);
        }
    }

    viewAllPeers();

    return (

        <div className="flex justify-center">
            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-80">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">No</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Peers</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {peerArray.map((peer, i) => {
                            return (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{peer}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}