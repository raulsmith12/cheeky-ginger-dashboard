import AddProduct from '../../../components/AddProduct';

const Product = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h2 className="display-2">Add New Product</h2>
                </div>
            </div>
            <AddProduct />
        </div>
    )
}

export default Product;