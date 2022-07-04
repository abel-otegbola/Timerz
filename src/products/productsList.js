import React from "react";
import Product from "../components/products/products";
import products from "../data/products";

class ProductList extends React.Component {
    constructor() {
        super()
        this.state = {
            products
        }
    }

    handleUpVote = (id) => {
        const newProducts = this.state.products.map(product => {
            if(product.id === id) {
                return Object.assign({}, product, {
                    votes: product.votes + 1
                })
            }
            else return product
        })
        this.setState({ products: newProducts})
    }

    render() {
        return (
            <div className="product-list">
                {
                    this.state.products.sort((a,b) => b.votes - a.votes).map(product => { return (
                        <Product product={product} upVote={() => this.handleUpVote(product.id)} key={product.id}/>
                    )
                    })
                }
            </div>
        )
    }
}

export default ProductList;