import { useEffect, useState } from "react";

import "./styles.scss";
import HamburgerImage from "../../assets/hamburger.png"
import cartSubIcon from "../../assets/cartSubIcon.svg"
import cartAddIcon from "../../assets/cartAddIcon.svg"

import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

import { useProducts } from "../../providers/Products";

function Product() {

    const { listOfProducts } = useProducts()

    const { slug } = useParams();
    const [actualProduct, setActualProduct] = useState()

    useEffect(() => {
        if (listOfProducts) {

            const product = listOfProducts.find(product => product.nm_product = slug)
            setActualProduct(product)
        }
    }, [listOfProducts])
    console.log(listOfProducts)

    const handleProductIncrement = () => {

    }

    const handleProductDecrement = () => {

    }

    return (
        <main className="ProductPageContainer">
            {actualProduct ? (
                <>
                    <div className="ProductPageContainer__ProductInfo">
                        <figure>
                            <img src={HamburgerImage} alt={actualProduct.nm_product} />
                            {/* <img src={actualProduct.url_image} alt={actualProduct.nm_product} /> */}
                            <figcaption>{actualProduct.nm_product}</figcaption>
                        </figure>

                        <div className="ProductInfo__details">
                            <strong>{actualProduct.nm_product}</strong>
                            <p>{actualProduct.description}</p>

                            <div>
                                <span className="details__price">R$ {actualProduct.vl_discount}</span>
                                <span className="details__price details__price--dashed">R$ {actualProduct.vl_price}</span>
                            </div>
                        </div>

                    </div>

                    <form className="ProductPageContainer__additional">
                        <div className="additional__yellowContainer additional__yellowContainer--ingredients">
                            <strong>Adicionar Ingredientes</strong>
                            <span>Até {actualProduct.ingredients[0].max_itens} ingredientes</span>
                        </div>
                        {actualProduct.ingredients[0].itens.map((additional) => (
                            <div className="additional__item" key={additional.id}>
                                <div className="item__data">
                                    <label>{additional.nm_item}</label>
                                    <span>+ R$ {additional.vl_item}</span>
                                </div>

                                <div className="item__ammount">
                                    <button
                                        type="button"
                                        id={1}
                                        disabled={actualProduct.ingredients[0] <= 1}
                                        onClick={() => handleProductDecrement(product)}
                                    >
                                        <img src={cartSubIcon} alt="ícone de Subtrair" />
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={1}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleProductIncrement(product)}
                                    >
                                        <img src={cartAddIcon} alt="ícone de Adicionar" />
                                    </button>
                                </div>
                            </div>

                        ))}
                        <div className="additional__yellowContainer additional__yellowContainer--cutlery">
                            <span>Precisa de Talher?</span>
                            <div>
                                <label>
                                    <input type="radio" name="cutlery" />
                                    <span>
                                        Sim
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="cutlery" />
                                    <span>
                                        Não
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="additional__footer">
                        <div className="item__ammount">
                                    <button
                                        type="button"
                                        id={1}
                                        disabled={actualProduct.ingredients[0] <= 1}
                                        onClick={() => handleProductDecrement(product)}
                                    >
                                        <img src={cartSubIcon} alt="ícone de Subtrair" />
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={1}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleProductIncrement(product)}
                                    >
                                        <img src={cartAddIcon} alt="ícone de Adicionar" />
                                    </button>
                                </div>

                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                </>
            ) : <ReactLoading type={"spin"} color={"red"} height={'20%'} width={'20%'} />}
        </main>
    )
}

export default Product;