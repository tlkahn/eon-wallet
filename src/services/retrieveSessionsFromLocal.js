export function retrieveSessionsFromLocal() {
    const myStorage = window.localStorage;
    return JSON.parse(localStorage.getItem('sessions'));
}