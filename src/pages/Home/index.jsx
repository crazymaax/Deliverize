import "./styles.scss"
import NoImage from "../../assets/noImage.png"
import HamburgerImage from "../../assets/hamburger.png"

import { Link } from "react-router-dom";

import { useProducts } from "../../providers/Products";
import { formatPrice } from "../../utils/format";
import Loading from "../../components/Loading";

function Home() {

    const { listOfProducts } = useProducts()

    return (
        <main className="homePageContainer">
            <h2 className="homePageContainer__title">Confira nossos produtos</h2>
            {listOfProducts ? (
                <div className="homePageContainer__ProductList">
                    {listOfProducts.map((product) => (
                        <Link
                            to={`/${product.nm_product}`}
                            key={product.id}
                            className="ProductList__Product"
                        >
                            <img src={HamburgerImage} alt={product.nm_product} />

                            {/* IMAGEM DA API ESTÁ QUEBRADA, PORTANTO FOI SUBSTITUIDO POR UMA IMAGEM ESTÁTICA. */}

                            {/* <img src={product.url_image} alt={product.nm_product} /> */}
                            <div>
                                <strong>{product.nm_product}</strong>
                                <span>{formatPrice(product.vl_discount)}</span>
                            </div>
                        </Link>
                    ))}

                    {/* LISTAGEM DE OUTROS PRODUTOS, APENAS PARA VERIFICAR COMO A PÁGINA SE COMPORTA COM MAIS PRODUTOS NA LOJA. */}

                    <Link
                        className="ProductList__Product"
                    >
                        <img src={NoImage} />
                        <div>
                            <strong>Outro Produto</strong>
                            <span>{formatPrice(10)}</span>
                        </div>
                    </Link>

                    <Link
                        className="ProductList__Product"
                    >
                        <img src={NoImage} />
                        <div>
                            <strong>Outro Produto</strong>
                            <span>{formatPrice(10)}</span>
                        </div>
                    </Link>
                    <Link
                        className="ProductList__Product"
                    >
                        <img src={NoImage} />
                        <div>
                            <strong>Outro Produto</strong>
                            <span>{formatPrice(10)}</span>
                        </div>
                    </Link>
                </div>
            ) : <Loading />}
        </main>
    )
}

export default Home;