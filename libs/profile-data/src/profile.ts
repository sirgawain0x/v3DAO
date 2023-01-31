import { providers } from 'ethers';
import { graphFetchList } from '@daohaus/data-fetch-utils';
import { HAUS_RPC, ValidNetwork } from '@daohaus/keychain-utils';
import { AccountProfile } from '@daohaus/utils';
import {
  ListActiveDomainsDocument,
  ListActiveDomainsQuery,
  ListActiveDomainsQueryVariables,
} from './subgraph/queries-ens/account.generated';
import {
  ListProfileDocument,
  ListProfileQuery,
  ListProfileQueryVariables,
} from './subgraph/queries-lens/profiles.generated';
import { ENSDomain, LensProfile } from './types';
import { transformProfile } from './utils';

export const getProfileForAddress = async (
  address: string,
  chainId: ValidNetwork
): Promise<AccountProfile> => {
  const reverseEnsRecord = await getENSReverseResolver({ address, chainId });
  const ensDomain = reverseEnsRecord
    ? reverseEnsRecord
    : await getENSDomain({
        address,
      });
  const lensProfile = await getLensProfile({
    memberAddress: address,
  } as ListProfileQueryVariables);

  return transformProfile({ address, lensProfile, ensDomain });
};

const getENSReverseResolver = async ({
  address,
  chainId,
}: {
  address: string;
  chainId: ValidNetwork;
}) => {
  // Workaround when poiting to a network where ENS is not deployed
  const daochain = !['0x1', '0x5'].includes(chainId) ? '0x1' : chainId; 
  try {
    const provider = new providers.JsonRpcProvider(HAUS_RPC[daochain]);
    const domainName = await provider.lookupAddress(address);
    if (domainName) {
      return {
        domain: {
          name: domainName,
        },
      };
    }
  } catch (error) {
    console.error('Unable to fetch ENS reverse record', error);
  }
};

const getENSDomain = async ({
  address,
  now = (new Date().getTime() / 1000).toFixed(0),
}: ListActiveDomainsQueryVariables): Promise<ENSDomain> => {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

  const res = await graphFetchList<
    ListActiveDomainsQuery,
    ListActiveDomainsQueryVariables
  >(ListActiveDomainsDocument, endpoint, {
    address: address.toLowerCase(),
    now,
  });

  return res.account?.activeDomains?.[0];
};

const getLensProfile = async ({
  memberAddress,
}: {
  memberAddress: ListProfileQueryVariables;
}): Promise<LensProfile> => {
  const url = 'https://api.lens.dev';

  const res = await graphFetchList<ListProfileQuery, ListProfileQueryVariables>(
    ListProfileDocument,
    url,
    {
      memberAddress,
    }
  );

  return res.profiles.items[0];
};
