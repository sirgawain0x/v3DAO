import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { handleErrorMessage, MolochV3Membership } from '@daohaus/utils';
import { listDaosByMember } from '@daohaus/moloch-v3-data';
import {
  H2,
  Spinner,
  useBreakpoint,
  useDebounce,
  widthQuery,
} from '@daohaus/ui';
import { isValidNetwork, ValidNetwork } from '@daohaus/keychain-utils';

import { DEFAULT_SORT_KEY, getDelegateFilter, SORT_FIELDS } from '../utils/hub';
import { DaoList } from './DaoList';
import { ListActions } from './ListActions';
import { useDHConnect } from '@daohaus/connect';

export enum ListType {
  Cards,
  Table,
}

export const HomeDashboard = () => {
  const isMobile = useBreakpoint(widthQuery.sm);
  const { appNetworks, address } = useDHConnect();
  const [daoData, setDaoData] = useState<MolochV3Membership[]>([]);
  const [filterNetworks, setFilterNetworks] = useState<string[]>(appNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [listType, setListType] = useState<ListType>(ListType.Cards);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const query = await listDaosByMember({
          memberAddress: address,
          networkIds: filterNetworks as ValidNetwork[],
          daoFilter: { name_contains_nocase: debouncedSearchTerm },
          memberFilter: getDelegateFilter(filterDelegate, address),
          ordering: SORT_FIELDS[sortBy].ordering,
          graphApiKeys: {
            '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
            '0x5': process.env['NX_GRAPH_API_KEY_MAINNET'],
            '0x64': process.env['NX_GRAPH_API_KEY_MAINNET'],
            '0x89': process.env['NX_GRAPH_API_KEY_MAINET'],
          },
        });
        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
          setLoading(false);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: 'Error loading DAOs',
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    if (!address) return;
    getDaos(address);
    return () => {
      shouldUpdate = false;
    };
  }, [address, filterNetworks, filterDelegate, sortBy, debouncedSearchTerm]);

  const toggleNetworkFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const network = event.currentTarget.value;
    if (network && isValidNetwork(network)) {
      filterNetworks.includes(network)
        ? setFilterNetworks((prevState) =>
            prevState.filter((n) => n !== network)
          )
        : setFilterNetworks((prevState) => [...prevState, network]);
    }
  };
  const toggleDelegateFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterDelegate((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };
  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const toggleListType = () => {
    setListType((prevState) =>
      prevState === ListType.Cards ? ListType.Table : ListType.Cards
    );
  };

  const tableControlProps = {
    toggleNetworkFilter,
    toggleDelegateFilter,
    toggleListType,
    switchSortBy,
    setSearchTerm,
    filterNetworks,
    filterDelegate,
    sortBy,
    listType,
    searchTerm,
    totalDaos: daoData.length,
    noun: {
      singular: 'DAO',
      plural: 'DAOs',
    },
  };

  if (!daoData.length) {
    return (
      <ListActions {...tableControlProps}>
        <NoDaosFound />
      </ListActions>
    );
  }
  if (loading) {
    return (
      <ListActions {...tableControlProps}>
        <Loading isMobile={isMobile} />
      </ListActions>
    );
  }
  return (
    <ListActions {...tableControlProps}>
      <DaoList daoData={daoData} isMobile={isMobile} listType={listType} />
    </ListActions>
  );
};

const CenterFrame = styled.div`
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    position: absolute;
  }
`;

const Loading = ({ isMobile }: { isMobile: boolean }) => (
  <CenterFrame>
    <div className="inner">
      <Spinner size={isMobile ? '8rem' : '16rem'} />
    </div>
  </CenterFrame>
);
const NoDaosFound = () => (
  <CenterFrame>
    <H2>No Daos Found</H2>
  </CenterFrame>
);
