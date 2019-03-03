// @flow
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();

history.isActive = function isActive(path: string) {
    return this.location.pathname + this.location.search === path;
};

history.isActiveDirectory = function isActiveDirectory(directory: string) {
    return this.location.pathname.startsWith(directory);
};

history.isActivePath = function isActivePath(path: string) {
    return this.location.pathname === path;
};

history.changeLocation = function changeLocation(location: string) {
    if (!this.isActive(location)) {
        this.push(location);
    }
};

export default history;
