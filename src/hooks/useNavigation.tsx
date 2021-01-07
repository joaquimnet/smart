import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
  const history = useHistory();

  return {
    go: (where: string) => history.push(where),
    makeGo: (where: string) => () => history.push(where),
  };
};
