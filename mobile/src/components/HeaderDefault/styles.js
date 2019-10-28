import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.SafeAreaView`
  background: #18161f;
  height: 64px;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled(Image)`
  width: 25px;
  height: 25px;
`;
