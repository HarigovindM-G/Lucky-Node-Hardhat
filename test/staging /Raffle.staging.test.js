const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const {
  developmentChains,
  netwokConfig,
} = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Lottery", async () => {
      let deployer
      let Lottery
      let accounts
      let LotteryFee
      let deployerAddress
      let winnerStartingBalance

      beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        deployerAddress = deployer
        Lottery = await ethers.getContract("Lottery", deployer)
        LotteryFee = await Lottery.getTicketPrice()
      })
      describe("fullfillrandomwords", async () => {
        it("works automatically with ChainlinkVRF and Chainlink Keepers", async () => {
          const startingTimeStamp = await Lottery.getLatestTimestamp()

          await new Promise(async (resolve, reject) => {
            console.log("Setting up Listener...")
            Lottery.once("WinnerPicked", async () => {
              console.log("Winner picked event is fired !! ")
              // resolve();
              try {
                const LotteryState = await Lottery.getLotteryState()
                const winner = await Lottery.getRecentWinner()
                const winner_endBal = await ethers.provider.getBalance(winner)
                const endingTimeStamp = await Lottery.getLatestTimestamp()

                assert.equal((await Lottery.getNumPlayers()).toString(),"0")
                assert.equal(
                  winner_endBal.toString(),
                  (await deployer.getBalance()).toString(),
                )
                assert.equal(LotteryState, 0)
                assert.equal(
                  winner_endBal.toString(),
                  winnerStartingBalance.add(LotteryFee).toString()
                )
                assert(endingTimeStamp > startingTimeStamp)
                resolve()
              } catch (e) {
                console.log(e)
                reject(e)
              }
            })
            try {
              console.log("Entering the lottery")
              const tx = await Lottery.EnterLottery({ value: LotteryFee })
              await tx.wait(1)
              console.log("Player entered")
              // winnerStartingBalance = await deployeradd.getbalance();
              winnerStartingBalance = await accounts[0].getBalance()
            } catch (e) {
              console.log(e)
              reject(e)
            }
          })
        })
      })
    })
