import React, { Component } from 'react';
import '../support/fontawesome-free/css/fontawesome.min.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductItem from './ProductItem';
import Cookies from 'universal-cookie'

const cookies = new Cookies ()
class ProductList extends Component {
    state = { listProduct: [], searchListProduct: [] }

    componentDidMount() {
        var kacrutPromise = axios.get('http://localhost:1971/popok')
        kacrutPromise.then((data) => {
            // console.log(res.data)
            this.setState({ listProduct: data.data, searchListProduct: data.data })
        }).catch((err) => {
            console.log()
        })
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value; //dapetin input dari textbox search
        var merk = this.refs.searchMerk.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listProduct.filter((item) => {
            return item.merk.includes(merk) 
                && item.harga >= hargaMin
                && item.harga <= hargaMax
                && item.nama.toLowerCase().includes(nama.toLowerCase())
        })
        this.setState({ searchListProduct: arrSearch })
    }

    renderListProduct = () => {
        var total = 12;
        var size = 4;
        var check = true;
        var listJSXProduct = this.state.searchListProduct.map((list) => {
            if(total === 0 && check === true) {
                size = 6;
                total = 12;
                check = false;
            }
            else if(total === 0 && check === false) {
                size = 4;
                total = 12;
                check = true;
            }
            total -= size;

            return (
               <ProductItem product={list} size={size}/>
            )
        })
        return listJSXProduct;
    }

    render () { 
        const username =  cookies.get('dataUser')
       if(username !== '') {
           if(this.props.product.id !== 0) {
           return<Redirect to={`/productdetail?productid=${this.props.product.id}&namaproduct=${this.props.product.nama}`}/>
        }
        return (
            <section className="bg-light" id="portfolio">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Category</h2>
                        <h3 className="section-subheading text-muted">Heaven on Earth</h3>
                    </div>

                    <div className="row">
                    <div className="col-6">
                    <form>
                        <input type="text" className="form-input" ref="searchNama" placeholder="Nama Product" />
                            <select ref="searchMerk">
                                <option value="">All Merk</option> 
                                <option>Nusa Tenggara</option>
                                <option>Bali</option>
                                <option>Jawa Tengah</option>
                                <option>Jawa Barat</option>
                            </select>
                        Harga : <input type="number" ref="hargaMinSearch" defaultValue="0" /> - <input type="number" ref="hargaMaxSearch" defaultValue="9999999" />
                                <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchClick} />
                    </form>
                           
                           
                        
                    </div>  
                    </div>
                <br></br>
                
                </div>
                <div className="row">
                   {this.renderListProduct()} 
                    <div className="col-md-4 col-sm-6 portfolio-item">
                    <a className="portfolio-link" data-toggle="modal" href="#portfolioModal2">
                        <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                        </div>
                    </a>
                    </div>
                </div>
                </div>
          </section>
        );
       }else{

       return <Redirect to="/login"/>
       }
    }
}
const mapStateToProps = (state) => {
    return {
        username:state.auth.username, product: state.selectedProduct
    }
}

export default connect(mapStateToProps)(ProductList);