const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
  const SimpleStorageContractFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )
  console.log("Deploying Contract... \n")
  const simpleStorage = await SimpleStorageContractFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract address: ${simpleStorage.address} \n`) // it spits out the address of the contract

  // First we need to check if the contract is being deployed on testnet or hardhat localhost machines
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  // Interacting with the contract
  const currentValue = await simpleStorage.retrive()
  console.log(`Current value: ${currentValue} \n`)

  const transactionResponse = await simpleStorage.store("69") // storing the new value in contract
  await transactionResponse.wait(1) // wating for one block to be mined after deployment

  const updatedValue = await simpleStorage.retrive() // retriving updated value from contract
  console.log(`Updated value: ${updatedValue} \n`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract... \n")

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if (error.message.toLowerCase().includes("alerady verified")) {
      console.log("Alerady Verified !!")
    } else {
      console.log(error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.log(error))
