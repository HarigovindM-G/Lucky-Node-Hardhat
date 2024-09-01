const { ethers } = require("hardhat")
const fs = require("fs")
const { network } = require("hardhat")
const { netwokConfig } = require("../helper-hardhat-config")
require("dotenv").config()

const FRONTEND_ABI = "../lottery-frontend/constants/abi.json"
const FRONTEND_CONTRACT_ADD= "../lottery-frontend/constants/contractaddress.json"

module.exports = async() =>{
    if(process.env.UPDATE_FRONTEND){
        console.log("Updating the frontend files .. ")
        updateAbi()
        updateContractAddresses()
    }

}
async function updateAbi(){
    const lottery = await ethers.getContract("Lottery")
    fs.writeFileSync(FRONTEND_ABI,lottery.interface.format(ethers.utils.FormatTypes.json))
}
async function updateContractAddresses(){
    const lottery = await ethers.getContract("Lottery")
    const currentaddress = JSON.parse(fs.readFileSync(FRONTEND_CONTRACT_ADD,"utf-8"))
    const chainid = network.config.chainId.toString()
    if(chainid in currentaddress){
        if(!currentaddress[chainid].includes(lottery.address)){
            currentaddress[chainid].push(lottery.address)
        }
    }
    else{
        currentaddress[chainid]=[lottery.address]
    }
    fs.writeFileSync(FRONTEND_CONTRACT_ADD,JSON.stringify(currentaddress))
}
module.exports.tags = ["all", "frontend"]