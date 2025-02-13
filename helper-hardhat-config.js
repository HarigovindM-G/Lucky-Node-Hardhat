const { ethers } = require("hardhat");

const netwokConfig={
    "sepolia":{
        name:"Sepolia",
        vrfCoordinatorV2:"0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
        ticketAmt: ethers.utils.parseEther("0.01"),
        keyHash:"0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
        subscriptionId:"112073423543429445902238589407464848027926571303051678493608320392672585486251",
        callbackGasLimit:"500000",
        interval:"30",
    },
    "hardhat":{
        name:"hardhat",
        ticketAmt:ethers.utils.parseEther("0.25"),
        keyHash:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        callbackGasLimit:"500000",
        interval:"30",
    }
}

const developmentChains = ["localhost", "hardhat"];

module.exports = {netwokConfig,developmentChains}