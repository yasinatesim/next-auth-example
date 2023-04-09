import { useSelector } from 'react-redux';

import { getUser } from '../selectors';

const useUser = () => useSelector(getUser);

export default useUser;
