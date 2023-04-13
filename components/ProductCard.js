import { useRouter } from 'next/router';
import axios from "axios";
import swal from "sweetalert";
import Link from "next/link";

const ProductCard = props => {
    const router = useRouter();

    const deleteProduct = (e) => {
        swal({
            title: 'Are you sure you want to delete this product?',
            text: 'Once deleted, this product cannot be recovered!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.cheekygingerstudios.com/public/api/products/${e}`
                })
                .then(result => {
                    swal("Success!", "Your product has been deleted!", "success"),
                    router.push("/")
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    return (
        <div className="card mb-2">
            <div className="card-body">
                <img src={props.img} width="50%" />
                <h5 className="card-title">{props.title}</h5>
                <Link href={`products/${props.id}`}><a className="btn btn-primary">Edit Product</a></Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(props.id)}>Delete Product</button>
            </div>
        </div>
    )
}

export default ProductCard;
