export const checkUser = (user) => {
    return (user != null && Object.keys(user)?.length > 0)
}