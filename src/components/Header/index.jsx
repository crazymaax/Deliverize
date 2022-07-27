import "./styles.scss"

import DeliverizeLogo from "../../assets/deliverizeLogo.svg"
import AccountIcon from "../../assets/accountIcon.svg"
import CartIcon from "../../assets/cartIcon.svg"
import ArrowIcon from "../../assets/arrowIcon.svg"

import { Link } from "react-router-dom"

import { useProducts } from "../../providers/Products"

function Header() {

    const { cart } = useProducts()

    const handleArrowClick = (target) => {
        const header = document.querySelector("header")

        if (target === "leftArrow") {
            header.style.transform = "translate(calc(-100vw - 2rem),0px)"
        } else {
            header.style.transform = "translate(0px,0px)"
        }
    }

    return (
        <header className="headerContainer">

            <div className="headerContainer__leftArrowSmallDevice" >
                <img
                    src={ArrowIcon}
                    alt="Seta para abrir menu"
                    id="leftArrow"
                    onClick={(e) => handleArrowClick(e.target.id)}
                />
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


                    <div className="buttons__container">
                        <img src={AccountIcon} alt="Ícone do usúario" />
                        <span>Entrar</span>
                    </div>

                    <div className="buttons__container">
                        <img src={CartIcon} alt="Ícone do carrinho" />
                        {cart.length > 0 && (
                            <div className="buttons__cartQuantity">
                                <span>{cart.length}</span>
                            </div>
                        )}
                        <span>Carrinho</span>
                    </div>
                </div>
            </div>

            <div className="headerContainer__rightArrowSmallDevice" >
                <img
                    src={ArrowIcon}
                    alt="Seta para abrir menu"
                    id="rightArrow"
                    onClick={(e) => handleArrowClick(e.target.id)}
                />
            </div>

        </header>
    )
}

export default Header;