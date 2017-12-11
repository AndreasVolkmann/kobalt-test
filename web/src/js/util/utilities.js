export const defaultImgUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

export const getConfig = (getState) => {
    const token = getState().auth.token;
    if (!token) console.error("Token is missing!");
    return {headers: {"Authorization": "Bearer " + token}}
};