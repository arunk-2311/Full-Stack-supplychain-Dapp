
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import CPCB from "../src/chain-info/contracts/CPCB.json"
import networkMapping from "../src/chain-info/deployments/map.json"

export default function ownerCode() {
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [codeArray, setCodes] = useState([]);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
            let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(connectedProvider.getSigner());
        }
        viewAllCodes();
    }, [codeArray])

    async function viewAllCodes() {

        const abi = CPCB['abi'];
        const contractAddress = networkMapping['4']["CPCB"][0];
        const waste = new ethers.Contract(contractAddress, abi, signer);

        try {
            const codes = await waste.listAllTransfers();
            console.log(codes)
            setCodes(codes);
        } catch (e) {
            console.log(e);
        }
    }


    function allotCategory(code) {

        switch (code) {
            case "1":
                return "Hard Plastic"
            case "2":
                return "Medium Hard Plastic"
            case "3":
                return "Soft Plastic"
            case "4":
                return "Thin Plastic"
        }
    }

    function allotType(code) {

        switch (code) {
            case "1":
                return "PVC"
            case "2":
                return "PET"
            case "3":
                return "LDPE"
            case "4":
                return "PS"
        }
    }

    viewAllCodes();

    return (

        <div className="flex justify-center">
            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-80">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">No</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Peer Address</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Transfer Code</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">From Pincode</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Category</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">To Pincode</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Weight</td>
                            <td className="px-6 py-4 whitespace-nowrap text-pink-500 ">Type</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {codeArray.map((code, i) => {
                            return (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{code.peerAddress}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{code.transfercode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{code.transfercode.substring(0, 6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{allotCategory(code.transfercode.substring(6, 7))}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{code.transfercode.substring(7, 13)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{code.transfercode.substring(13, 20)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{allotType(code.transfercode.substring(20, 21))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}