const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with current favourite number 0", async function () {
    const currentValue = await simpleStorage.retrive()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should update when call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrive()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should store the name to favourite number", async function () {
    const expectedValue = "69"
    const transactionResponse = await simpleStorage.addPerson(
      "Ashish Kumar",
      "69"
    )
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.nameToFavouriteNumber(
      "Ashish Kumar"
    )
    assert.equal(currentValue.toString(), expectedValue)
  })
})
