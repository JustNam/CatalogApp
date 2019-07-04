
import { createBrowserHistory } from 'history';

export const historyWithRefresh = createBrowserHistory({ forceRefresh: true });
export default createBrowserHistory();