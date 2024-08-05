# sei

```
{
	"chain_name": "sei",
	"chain_id": "pacific-1",
	"pfm_enabled": false,
	"cosmos_module_support": { "authz": true, "feegrant": true },
	"supports_memo": true,
	"logo_uri": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pacific/chain.png",
	"bech32_prefix": "sei",
	"fee_assets": [
		{ "denom": "usei", "gas_price": { "low": "0.1", "average": "0.2", "high": "0.3" } }
	],
	"chain_type": "cosmos",
	"ibc_capabilities": {
		"cosmos_pfm": false,
		"cosmos_ibc_hooks": false,
		"cosmos_memo": true,
		"cosmos_autopilot": false
	},
	"is_testnet": false,
	"pretty_name": "Sei"
}
```

# sei noble usdc

```
  {
    denom: 'ibc/CA6FBFAF399474A06263E10D0CE5AEBBE15189D6D4B2DD9ADE61007E68EB9DB0',
    chainID: 'pacific-1',
    originDenom: 'uusdc',
    originChainID: 'noble-1',
    trace: 'transfer/channel-45',
    isCW20: false,
    isEVM: false,
    isSVM: false,
    symbol: 'USDC',
    name: 'USDC',
    logoURI: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png',
    decimals: 6,
    tokenContract: undefined,
    description: 'Native Coin',
    coingeckoID: 'usd-coin',
    recommendedSymbol: 'USDC'
  }
```

# arb

```
{
	"chain_name": "Arbitrum",
	"chain_id": "42161",
	"pfm_enabled": false,
	"cosmos_module_support": { "authz": false, "feegrant": false },
	"supports_memo": false,
	"logo_uri": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
	"bech32_prefix": "",
	"fee_assets": [],
	"chain_type": "evm",
	"ibc_capabilities": {
		"cosmos_pfm": false,
		"cosmos_ibc_hooks": false,
		"cosmos_memo": false,
		"cosmos_autopilot": false
	},
	"is_testnet": false,
	"pretty_name": "Arbitrum"
}
```

# arb usdc

```
  {
    denom: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    chainID: '42161',
    originDenom: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    originChainID: '42161',
    trace: '',
    isCW20: false,
    isEVM: true,
    isSVM: false,
    symbol: 'USDC',
    name: 'Arbitrum USDC',
    logoURI: 'https://raw.githubusercontent.com/axelarnetwork/axelar-configs/main/images/tokens/usdc.svg',
    decimals: 6,
    tokenContract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    description: '',
    coingeckoID: 'usd-coin',
    recommendedSymbol: 'USDC'
  }
```


https://go.skip.build?
src_chain=42161
src_asset=0xaf88d065e77c8cc2239327c5edb3a432268e5831
dest_chain=pacific-1
dest_asset=ibc/ca6fbfaf399474a06263e10d0ce5aebbe15189d6d4b2dd9ade61007e68eb9db0
amount_in=1
amount_out=0.8

{"source_asset_denom":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","source_asset_chain_id":"1","dest_asset_denom":"ibc/CA6FBFAF399474A06263E10D0CE5AEBBE15189D6D4B2DD9ADE61007E68EB9DB0","dest_asset_chain_id":"pacific-1","amount_in":"1000000","cumulative_affiliate_fee_bps":"0","allow_unsafe":true,"experimental_features":["hyperlane"],"allow_multi_tx":true,"smart_relay":true,"smart_swap_options":{"split_routes":true,"evm_swaps":true}}
