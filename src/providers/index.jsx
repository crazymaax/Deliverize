import { ProductsProvider } from "./Products";

const Providers = ({ children }) => {
    return (
        <ProductsProvider>
                {children}
        </ProductsProvider>
    )
};
export default Providers;