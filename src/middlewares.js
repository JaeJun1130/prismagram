export const isAuthenticated = (request, object) => {
    if (!request.user) {
        throw Error(`YOU NEED TO LOG IN TO PERFORM THIS ACTION`);
    }
    return;
};
