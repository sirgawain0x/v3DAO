// FOR DEMONSTRATIOn
export const limitedNetworkTest = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    rpc: `https://${process.env.NX_RIVET_KEY}.eth.rpc.rivet.cloud/`,
    explorer: 'https://etherscan.io',
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    rpc: `https://${process.env.NX_RIVET_KEY}.goerli.rpc.rivet.cloud/`,
    explorer: 'https://goerli.etherscan.io',
  },
  '0x89':{
    chainId: '0x89',
    networkId: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpc:`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NX_ALCHEMY_API_KEY_POLYGON}`,
    explorer: 'https://polyscan.com',
  },
  '0xa4b1':{
    chainId: '0xa4b1',
    networkId: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpc: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NX_ALCHEMY_API_KEY_ARBITRUM}`,
    explorer: 'https://arbiscan.com',
  },
};
