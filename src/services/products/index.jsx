import { instance } from "../index";

export const listProducts = async () => {

    const response = await instance
        .get(`/products`)
        .then((response) => {
            const products = response.data
            return products
        })
        .catch((error) => {
            return false;
        })

    return response
};