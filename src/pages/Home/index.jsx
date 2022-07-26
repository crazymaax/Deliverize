import "./styles.scss"

import { Link } from "react-router-dom";
import { useProducts } from "../../providers/Products";

import ReactLoading from 'react-loading';

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
                            <img src={product.url_image} alt={product.nm_product} />
                            <strong>{product.nm_product}</strong>
                            <span>R$ {product.vl_discount}</span>
                        </Link>
                    ))}

                    <Link
                        className="ProductList__Product"
                    >
                        <img src="https://pbs.twimg.com/profile_images/1362579947479515145/rqw8d34L_400x400.jpg" />
                        <strong>Outro Produto</strong>
                        <span>R$ 10</span>
                    </Link>

                    <Link
                        className="ProductList__Product"
                    >
                        <img src="https://pbs.twimg.com/profile_images/1362579947479515145/rqw8d34L_400x400.jpg" />
                        <strong>Outro Produto</strong>
                        <span>R$ 10</span>
                    </Link>
                    <Link
                        className="ProductList__Product"
                    >
                        <img src="https://pbs.twimg.com/profile_images/1362579947479515145/rqw8d34L_400x400.jpg" />
                        <strong>Outro Produto</strong>
                        <span>R$ 10</span>
                    </Link>
                </div>
            ) : <ReactLoading type={"spin"} color={"red"} height={'20%'} width={'20%'} />}
        </main>
    )
}

export default Home;