import { useEffect } from "react"

import "./styles.scss"

import { useProducts } from "../../../providers/Products"

const PopupModal = () => {

    const { setIsCartModalOpen, cart } = useProducts()

    const { additionals, name, finalPrice } = cart[cart.length - 1] // Informações apenas do ultimo elemento, aquele que foi adicionado.

    useEffect(() => {
        setTimeout(() => {
            setIsCartModalOpen(false)
        }, 2000)
    }, [])

    return (
        <div className="userInfo__cartModal">
            <span className="cartModal__title">Adicionado com Sucesso</span>
            <div className="cartModal__informations">
                <strong>{name}</strong>
                <div>
                    {additionals && (
                        <>
                            <span>Adicionais:</span>
                            <ul>
                                {additionals.map((additional, index) => (
                                    <li key={index}>
                                        <span>{additional.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    <span className="informations__price">Valor total: R$ {finalPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default PopupModal;