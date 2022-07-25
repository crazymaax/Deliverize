import DeliverizeLogo from "../../assets/deliverizeLogo.svg"
import AccountIcon from "../../assets/accountIcon.svg"
import CartIcon from "../../assets/cartIcon.svg"


function Header() {
    return (
        <header>
            <img src={DeliverizeLogo} alt="Deliverize" />

            <label>Entrega:</label>
            <input type="text" />

            <input type="text" placeholder="Busqye por estabelecimentos ou produtos" />

            <div>
                <img src={AccountIcon} alt="Ícone do usúario" />
                <span>Entrar</span>
            </div>

            <div>
                <img src={CartIcon} alt="Ícone do carrinho" />
                <span>Carrinho</span>
            </div>
        </header>
    )
}

export default Header;