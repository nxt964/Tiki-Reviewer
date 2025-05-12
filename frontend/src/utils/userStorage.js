export const setCurrentUser = (currentUser) => {
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

export const getCurrentUser = () => {
    return JSON.parse(window.localStorage.getItem('currentUser'));
}

export const removeCurrentUser = () => {
    window.localStorage.removeItem('currentUser');
}