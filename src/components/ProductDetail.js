import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import { select_product, addCart } from '../actions';
import { Input, Form } from 'reactstrap';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductDetail extends Component {

    onCartBtn = () => {
        var idproduct = this.props.product.id
        var nama = this.props.product.nama
        var img = this.props.product.img
        var hargaproduk = this.props.product.harga
        var qty = this.refs.qty.refs.innerqty.value

        axios.post('http://localhost:1971/cart' , {
      
            username : this.props.username,
            id_produk : idproduct,
            nama_product : nama,
            img : img,
            harga_produk : hargaproduk,
            kuantitas : qty,
            total : hargaproduk*qty,
            id_order : 1
          }).then((res) => {
            console.log(res)
            alert('Product berhasil dimasukan ke Cart')
            this.props.tambahCart() 
          }).catch((err) => {
            console.log(err)
          })
          }
      

    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var productId = params.productid;
        // var productId = this.props.match.params.id;
        axios.get(`http://localhost:1971/popok/${productId}`)
            .then((res) => {
                this.props.select_product(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    render () {
        var { nama, img, description, merk, harga } = this.props.product;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive"/>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2>{rupiah.format(harga)} </h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
            
                            <div className="col-8"> 
                            <Form inline>
                            <Input type="number" style={{ marginLeft:'20px' , width: '60px' , marginRight:'20px'}} ref='qty' innerRef = 'innerqty' defaultValue = '1'/>
                            <Input type="button" className="btn-success" value='Add to Cart' onClick={this.onCartBtn}/>
                            </Form>
                            </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { product: state.selectedProduct, username : state.auth.username }
}

export default connect(mapStateToProps, {select_product, addCart})(ProductDetail);