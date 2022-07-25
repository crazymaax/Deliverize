import { Link } from "react-router-dom";
import { useProducts } from "../../providers/Products";

function Home() {

    const { listOfProducts } = useProducts()

    return (
        <>
            <h1>Deliverize</h1>

            {listOfProducts.map((product) => (
                <Link
                to={`/${product.nm_product}`}
                key={product.id}
            >
                    <img src={product.url_image} alt={product.nm_product} />
                    <strong>{product.nm_product}</strong>
                    <span>R$ {product.vl_discount}</span>
                </Link>
            ))}
        </>
    )
}

export default Home;