import CreateNote from './create';
import Notes from './notes';
import { MainContent } from './styled';

const Content = () => {
  return (
    <MainContent>
      <CreateNote />
      <Notes />
    </MainContent>
  );
};

export default Content;
