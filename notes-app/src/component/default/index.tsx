import HeaderBar from '../Header';
import Content from '../content';
import { Container } from './styled';

const DefaultComponent = () => {
  return (
    <Container>
      <HeaderBar />
      <Content />
    </Container>
  );
};

export default DefaultComponent;
