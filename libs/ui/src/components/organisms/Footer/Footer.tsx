import React from 'react';
import styled from 'styled-components';

import { ParMd, Link } from '../../atoms';
import creativeIcon from '../../../assets/Creative_logo.svg';
import { widthQuery } from '../../../theme/global/breakpoints';

const StyledFooter = styled.footer`
  margin-top: 17rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  .logo-box {
    display: flex;
    align-items: center;
    img {
      width: auto;
      height: 64px;
      margin-right: 1.8rem;
    }
  }
  @media ${widthQuery.md} {
    margin-top: 12rem;
  }
  @media ${widthQuery.sm} {
    margin-top: 6rem;
  }
  @media ${widthQuery.xs} {
    margin-top: 3rem;
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="logo-box">
        <img src={creativeIcon} alt="Creative Play logo" />
        <ParMd>
          Built by{' '}
          <Link href="https://creativeplatform.xyz">
            Creative Organization DAO
          </Link>
        </ParMd>
      </div>
    </StyledFooter>
  );
};
