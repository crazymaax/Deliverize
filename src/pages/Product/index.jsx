import { useEffect, useState } from "react";

import "./styles.scss";
import HamburgerImage from "../../assets/hamburger.png"
import cartSubIcon from "../../assets/cartSubIcon.svg"
import cartAddIcon from "../../assets/cartAddIcon.svg"

import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

import { useProducts } from "../../providers/Products";
import { formatPrice } from "../../utils/format";

function Product() {

    const { listOfProducts, actualProduct, setActualProduct, currentAdditionals, setAdditionals, setIsCartModalOpen, cart, setCart, updateProductAmount } = useProducts()

    const [quantityOfItens, setQuantityOfItens] = useState(1)
    const [withCutlery, setWithCutlery] = useState(false)

    const { slug } = useParams();

    useEffect(() => {
        if (listOfProducts) {
            const product = listOfProducts.find(product => product.nm_product = slug)
            setActualProduct(product)

            const additionals = product.ingredients[0].itens
            setAdditionals(additionals)
        }
    }, [listOfProducts])

    const handleProductIncrement = (amount, additional) => {
        updateProductAmount(amount + 1, additional)
    }

    const handleProductDecrement = (amount, additional) => {
        updateProductAmount(amount - 1, additional)
    }

    const handleAddProductToCart = (e) => {
        e.preventDefault()

        let price = actualProduct.vl_discount * quantityOfItens

        const itens = actualProduct.ingredients[0].itens

        for (let i = 0; i < itens.length; i++) {
            const currentAdditional = currentAdditionals[itens[i].nm_item]
            price += currentAdditional * itens[i].vl_item
        }

        let listOfAdditionals = []
        for (var item in currentAdditionals) {
            if (currentAdditionals[item] !== 0) {
                const data = {
                    name: item,
                    quantity: currentAdditionals[item]
                }
                listOfAdditionals.push(data)
            }
        }

        const data = {
            additionals: listOfAdditionals,
            name: actualProduct.nm_product,
            quantity: quantityOfItens,
            cutlery: withCutlery,
            finalPrice: price,
        }

        const updatedCart = [...cart, data]
        setCart(updatedCart)
        setIsCartModalOpen(true)
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
                                <span className="details__price">{formatPrice(actualProduct.vl_discount)}</span>
                                <span className="details__price details__price--dashed"> 
                                {formatPrice(actualProduct.vl_price)}</span>
                            </div>
                        </div>

                    </div>

                    <form
                        className="ProductPageContainer__additional"
                        onSubmit={handleAddProductToCart}
                    >
                        <div className="additional__yellowContainer additional__yellowContainer--ingredients">
                            <strong>Adicionar Ingredientes</strong>
                            <span>Até {actualProduct.ingredients[0].max_itens} ingredientes</span>
                        </div>
                        {actualProduct.ingredients[0].itens.map((additional) => {
                            if (!additional.amount) {
                                additional.amount = 0;
                            }
                            return (

                                <div className="additional__item" key={additional.id}>
                                    <div className="item__data">
                                        <label>{additional.nm_item}</label>
                                        <span>+ {formatPrice(additional.vl_item)}</span>
                                    </div>

                                    <div className="item__ammount">
                                        <button
                                            type="button"
                                            id={additional.id}
                                            disabled={currentAdditionals[additional.nm_item] < 1}
                                            onClick={() => handleProductDecrement(currentAdditionals[additional.nm_item], additional.nm_item)}
                                        >
                                            <img src={cartSubIcon} alt="ícone de Subtrair" />
                                        </button>
                                        <input
                                            type="number"
                                            readOnly
                                            value={currentAdditionals[additional.nm_item]}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleProductIncrement(currentAdditionals[additional.nm_item], additional.nm_item)}
                                        >
                                            <img src={cartAddIcon} alt="ícone de Adicionar" />
                                        </button>
                                    </div>
                                </div>

                            )
                        })}
                        <div className="additional__yellowContainer additional__yellowContainer--cutlery">
                            <span>Precisa de Talher?</span>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="cutlery"
                                        onChange={() => setWithCutlery(true)} />
                                    <span>
                                        Sim
                                    </span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="cutlery"
                                        onChange={() => setWithCutlery(false)}
                                    />
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
                                    disabled={quantityOfItens <= 1}
                                    onClick={() => setQuantityOfItens(quantityOfItens - 1)}
                                >
                                    <img src={cartSubIcon} alt="ícone de Subtrair" />
                                </button>
                                <input
                                    type="number"
                                    readOnly
                                    value={quantityOfItens}
                                />
                                <button
                                    type="button"
                                    onClick={() => setQuantityOfItens(quantityOfItens + 1)}
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