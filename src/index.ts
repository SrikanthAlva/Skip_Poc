import { SkipRouter, SKIP_API_URL } from '@skip-go/core'
import { createWalletClient, custom, extractChain, http } from 'viem'
import * as chains from 'viem/chains'
import dotenv from 'dotenv'
import * as chainRegistry from 'chain-registry'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { privateKeyToAccount } from 'viem/accounts'
dotenv.config()

interface UserAddress {
	chainID: string
	address: string
}
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

const client = new SkipRouter({
	getEVMSigner: async () => {
		const chain = extractChain({
			chains: Object.values(chains),
			id: 137,
		})
		const evmWalletClient = createWalletClient({
			account,
			chain: chain,
			transport: http(),
		})
		return evmWalletClient
	},
})

async function skip() {
	try {
		let chains, assets
		chains = await client.chains({
			includeEVM: true,
			includeSVM: false,
			onlyTestnets: false,
		})
		// let sei = chains.find((chn: any) => chn.chainName === 'sei')
		// let pol = chains.find((chn: any) => chn.chainName.toLowerCase() === 'Polygon')

		// get assets filtered by chain id
		// assets = await client.assets({
		// 	chainID: 'pacific-1',
		// 	includeEvmAssets: true,
		// 	includeCW20Assets: true,
		// 	includeSvmAssets: false,
		// })
		// let usdcAssets = assets['pacific-1'].filter((ast: any) =>
		// 	ast.name.toLowerCase().includes('usdc')
		// )
		// console.log('usdc on Sei')
		// console.log(usdcAssets)

		// assets = await client.assets({
		// 	chainID: '137',
		// 	includeEvmAssets: true,
		// 	includeCW20Assets: true,
		// 	includeSvmAssets: false,
		// })
		// usdcAssets = assets['137'].filter((ast: any) => ast.name.toLowerCase().includes('usdc'))
		// console.log('usdc on Arbitrum')
		// console.log(usdcAssets)

		// await recommendedRoute()

		await getRoute()
	} catch (error) {
		console.error('Error Calling Function', error)
	}
}

const getRoute = async () => {
	const route = await client.route({
		amountIn: '3000000',
		sourceAssetDenom: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		sourceAssetChainID: '137',
		destAssetDenom: 'ibc/CA6FBFAF399474A06263E10D0CE5AEBBE15189D6D4B2DD9ADE61007E68EB9DB0',
		destAssetChainID: 'pacific-1',
		cumulativeAffiliateFeeBPS: '0',
		smartRelay: true,
		smartSwapOptions: {
			evmSwaps: true,
			splitRoutes: true,
		},
		// allowMultiTx: true,
		allowUnsafe: true,
	})

	// console.log(route)

	console.log(route.requiredChainAddresses) // Poly,osmo,noble,sei

	// await client.messages()

	let userAddresses: UserAddress[] = []

	// userAddresses.push(userAddressSei)

	for (const chainID of route.requiredChainAddresses) {
		// Check that the chain is an EVM chain

		console.log(chainID)
		if (parseInt(chainID)) {
			// use signer library to get address from wallet
			const chain = extractChain({
				chains: Object.values(chains),
				id: 137,
			})
			// const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
			// const evmWalletClient = createWalletClient({
			// 	account,
			// 	chain: chain,
			// 	transport: http(),
			// })
			// const [address] = await evmWalletClient.requestAddresses()
			// add to map
			userAddresses.push({ address: account.address, chainID: chainID })
		} else {
			// handle cosmos and SVM wallets -- not shown

			const address = await getCosmosAddress(chainID)
			userAddresses.push({ address: address, chainID: chainID })
		}
	}

	console.log(userAddresses)

	await client.executeRoute({
		route,
		userAddresses: userAddresses,
		onTransactionCompleted: async (chainID: any, txHash: any, success: any) => {
			console.log(txHash)
		},
	})
}

// Generates a Cosmos signer for a given chainID,
// loading the mnemonic from the environment
const getCosmosSigner = async (chainID: any) => {
	// osmosis, noble, sei
	// load mnemonic from environment
	const mnemonic = process.env.MNEMONIC
	if (!mnemonic) {
		throw new Error('Mnemonic not set')
	}

	// find chain in chain registry to get bech32 prefix and cointype
	const chain = chainRegistry.chains.find((chain) => chain.chain_id == chainID)
	if (!chain?.bech32_prefix) {
		throw new Error(`Chain Registry missing prefix for ${chainID}`)
	}
	if (!chain?.slip44) {
		throw new Error(`Chain Registry missing cointype for ${chainID}`)
	}
	// create wallet
	const hdPath = stringToPath(`m/44'/${chain.slip44}'/0'/0/0`)

	const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
		prefix: chain.bech32_prefix,
		hdPaths: [hdPath],
	})

	return wallet
}

async function getCosmosAddress(chainID: any) {
	const signer = await getCosmosSigner(chainID)
	const accounts = await signer.getAccounts()
	console.log('Cosmos Wallet Address', accounts[0].address)
	return accounts[0].address
}

skip()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

const recommendedRoute = async () => {
	const request = [
		{
			sourceAssetDenom: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
			sourceAssetChainID: '137',
			destChainID: 'pacific-1',
		},
	]
	const recommendations = await client.recommendAssets(request)
	console.log(recommendations)
}
