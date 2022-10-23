import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Link from "next/link";

const ProductCard = props => {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <img src={props.img} width="50%" />
                <h5 className="card-title">{props.title}</h5>
                <Link href={`products/${props.id}`}><a className="btn btn-primary">Edit Product</a></Link>
            </div>
        </div>
    )
}

export default ProductCard;
