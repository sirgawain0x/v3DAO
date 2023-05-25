import styled from 'styled-components';
import { Link } from '@gnosis.pm/safe-react-components';
import { Container } from '@material-ui/core';

const AppFooter = () => {
  return (
    <StyledFooter>
      <Link href="https://creativeplatform.xyz/" target="_blank">
        <StyledImage alt="built by Creative" src="/assets/creative.png" />
      </Link>
    </StyledFooter>
  );
};

const StyledImage = styled.img`
  max-height: 150px;
  max-width: 200px;
`;

const StyledFooter = styled(Container)`
  && {
    margin-left: 30px;
    margin-right: 30px;
    padding: 0;
  }
`;

export default AppFooter;
