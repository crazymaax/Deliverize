import "./styles.scss"

import DeliverizeLogo from "../../assets/deliverizeLogo.svg"
import AccountIcon from "../../assets/accountIcon.svg"
import CartIcon from "../../assets/cartIcon.svg"
import ArrowIcon from "../../assets/arrowIcon.svg"

import { Link } from "react-router-dom"

import PopupModal from "../Modals/PopupModal"
import { useProducts } from "../../providers/Products"

function Header() {

    const { isCartModalOpen, cart } = useProducts()

    const handleArrowClick = () => {
        const header = document.querySelector("header")
        header.classList.toggle("rolled")
    }

    return (
        <header className="headerContainer">

            <div
                className="headerContainer__leftArrowSmallDevice"
                onClick={handleArrowClick}
            >
                <img src={ArrowIcon} alt="Seta para abrir menu" />
            </div>

            <Link className="headerContainer__deliverizeLogo" to="/">
                <img src={DeliverizeLogo} alt="Deliverize" />
            </Link>

            <div className="headerContainer__userInfo">

                <div className="userInfo__location">
                    <label>Entrega:</label>
                    <span>Rua tal</span>
                </div>

                <input
                    type="text"
                    placeholder="Busque por estabelecimentos ou produtos"
                    className="userInfo__searchbar"
                />

                <div className="userInfo__buttons">
                    <img src={AccountIcon} alt="Ícone do usúario" />
                    <span>Entrar</span>
                </div>

                <div className="userInfo__buttons">
                    <img src={CartIcon} alt="Ícone do carrinho" />
                    {cart.length > 0 && (
                        <div className="buttons__cartQuantity">
                            <span>{cart.length}</span>
                        </div>
                    )}
                    <span>Carrinho</span>
                </div>

                {isCartModalOpen && (
                    <PopupModal />
                )}

                <div
                    className="headerContainer__rightArrowSmallDevice"
                    onClick={handleArrowClick}
                >
                    <img src={ArrowIcon} alt="Seta para abrir menu" />
                </div>
            </div>
        </header>
    )
}

export default Header;