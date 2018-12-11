import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_product, addCart } from '../actions';
// import { Input, Form } from 'reactstrap';
// import axios from 'axios'

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductItem extends Component {

    onItemClick = () => {
        this.props.select_product(this.props.product);
    }

    

    render() {
        const { img, nama, description, harga } = this.props.product;
        return (
            <div className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
                 <a className="portfolio-link" data-toggle="modal">
                        <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x"   onClick={this.onItemClick} />
                        </div>
                        </div >
                            <img className="img-fluid" src={img} alt="" />
                        </a>
                        <div className="portfolio-caption">
                            <h4>{nama}</h4>
                            <h5>{rupiah.format(harga)} </h5>
                            <p className="text-muted">{description}</p>
                            {/* <center>
                            <div className="col-8"> 
                            <Form inline>
                            <Input type="number" style={{ marginLeft:'20px' , width: '60px' , marginRight:'20px'}} ref='qty' innerRef = 'innerqty' defaultValue = '1'/>
                            <Input type="button" className="btn-success" value='Add' onClick={this.onCartBtn}/>
                            </Form>
                            </div>
                            </center> */}
                        </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
      username : state.auth.username
     }
  }

export default connect(mapStateToProps, {select_product, addCart})(ProductItem);