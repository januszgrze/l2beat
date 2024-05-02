import { EthereumAddress, UnixTime } from '@l2beat/shared-pure'

import { DERIVATION } from '../common'
import { ProjectDiscovery } from '../discovery/ProjectDiscovery'
import { opStackL2 } from './templates/opStack'
import { Layer2 } from './types'

const discovery = new ProjectDiscovery('bob')

const upgradeability = {
  upgradableBy: ['ProxyAdmin'],
  upgradeDelay: 'No delay',
}

export const bob: Layer2 = opStackL2({
  discovery,
  display: {
    name: 'BOB',
    slug: 'bob',
    warning:
      'Fraud proof system is currently under development. Users need to trust the block proposer to submit correct L1 state roots.',
    description:
      'BOB ("Build on Bitcoin") is an OP Stack rollup that natively supports the Bitcoin stack, incl. Ordinals, Lightning and Nostr, powered by cross-chain light clients, a universal Bitcoin smart contract SDK, and the Risc Zero zkVM.',
    purposes: ['Universal'],
    links: {
      websites: ['https://gobob.xyz/'],
      apps: ['https://www.gobob.xyz/ecosystem'],
      documentation: ['https://docs.gobob.xyz', 'https://stack.optimism.io/'],
      explorers: [
        'https://explorer.gobob.xyz/',
      ],
      repositories: ['https://github.com/bob-collective'],
      socialMedia: [
        'https://twitter.com/build_on_bob',
      ],
    },
    activityDataSource: 'Blockchain RPC',
  },
  upgradeability,
  rpcUrl: 'https://rpc.gobob.xyz/',
  finality: {
    type: 'OPStack-blob',
    minTimestamp: new UnixTime(1710375515),
    genesisTimestamp: new UnixTime(1686789347),
    l2BlockTimeSeconds: 2,
    lag: 0,
  },
  genesisTimestamp: new UnixTime(1686796655),
  isNodeAvailable: true,
  milestones: [
    {
      name: 'BOB Mainnet Launch',
      link: 'https://base.mirror.xyz/hwNwqXHVoLlO8s4DZppog4DfGvM34tigaDjOWuEJQfY',
      date: '2023-07-13T00:00:00.00Z',
      description: 'BOB is now live on mainnet.',
    },
  ],
  nonTemplateEscrows: [
    discovery.getEscrowDetails({
      address: EthereumAddress('0x9de443AdC5A411E83F1878Ef24C3F52C61571e72'),
      tokens: ['wstETH'],
      description:
        'wstETH Vault for custom wstETH Gateway. Fully controlled by Lido governance.',
    }),
  ],
  nonTemplatePermissions: [
    ...discovery.getMultisigPermission(
      'AdminMultisig',
      'This address is the owner of the ProxyAdmin. It can upgrade the bridge implementation potentially gaining access to all funds.',
    ),
    ...discovery.getMultisigPermission(
      'GuardianMultisig',
      "Address designated as a Guardian of the OptimismPortal, meaning it can halt withdrawals. It's the owner of SystemConfig, which allows to update the sequencer address. Moreover, it can challenge state roots without going through the fault proof process.",
    ),
    ...discovery.getMultisigPermission(
      'BaseMultisig',
      "Core multisig of the Base team, it's a member of the AdminMultisig, meaning it can upgrade the bridge implementation potentially gaining access to all funds.",
    ),
    ...discovery.getMultisigPermission(
      'OptimismMultisig',
      "Core multisig of the Optimism team, it can challenge state roots without going through the fault proof process. It's also a member of the AdminMultisig, meaning it can upgrade the bridge implementation potentially gaining access to all funds.",
    ),
  ],
  nonTemplateContracts: [
    discovery.getContractDetails('Challenger1of2', {
      description:
        "This contract is the permissioned challenger of the system. It can delete non finalized roots without going through the fault proof process. It is functionally equivalent to a 1/2 multisig where neither party can remove the other's permission to execute a Challenger call. It is controlled by the GuardianMultisig and the OptimismMultisig.",
    }),
  ],
  chainConfig: {
    name: 'bob',
    chainId: 60808,
    explorerUrl: 'https://explorer.gobob.xyz/',
    explorerApi: {
      url: 'https://explorer.gobob.xyz/api',
      type: 'blockscout',
    },
    // ~ Timestamp of block number 0 on Base
    // https://basescan.org/block/0
    minTimestampForTvl: UnixTime.fromDate(new Date('2023-06-15T12:35:47Z')),
    multicallContracts: [
      {
        address: EthereumAddress('0x089b191d95417817389c8eD9075b51a38ca46DE8'),
        batchSize: 150,
        sinceBlock: 2469044,
        version: '3',
      },
    ],
  },
  usesBlobs: false,
})