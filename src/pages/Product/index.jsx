import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProducts } from "../../providers/Products";

import ReactLoading from 'react-loading';

function Product() {

    const { listOfProducts } = useProducts()

    const { slug } = useParams();
    const [actualProduct, setActualProduct] = useState()

    useEffect(() => {
        const product = listOfProducts.find(product => product.nm_product = slug)
        setActualProduct(product)
    }, [listOfProducts])

    return (
        <main className="mainContent">
            <div className="mainContent__info">
                {actualProduct ? (
                    <>
                        <figure>
                            <img src={actualProduct.url_image} alt={actualProduct.nm_product} />
                            <figcaption>{actualProduct.nm_product}</figcaption>
                        </figure>
                        <strong>{actualProduct.nm_product}</strong>
                        <p>{actualProduct.description}</p>

                        <div>
                            <span>R$ {actualProduct.vl_discount}</span>
                            <span>R$ {actualProduct.vl_price}</span>
                        </div>

                        <div>

                        </div>
                    </>
                ) : <ReactLoading type={"spin"} color={"red"} height={'20%'} width={'20%'} />}
            </div>
        </main>
    )
}

export default Product;