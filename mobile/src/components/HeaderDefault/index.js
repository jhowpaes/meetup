import React from 'react';

import logo from '~/assets/logo-header.png';
import { Container, Logo } from './styles';

export default function HeaderDefault() {
  return (
    <Container>
      <Logo source={logo} />
    </Container>
  );
}
