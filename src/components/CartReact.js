import React from 'react';
import { Table,Input } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class Cart extends React.Component {
    state = {listCart : [], selectEditCart: 0}

  componentDidMount(){
    this.getCartList()
  } 
  

  getCartList = () => {
    axios.get('http://localhost:1971/cart')
    .then((res) => {
        // console.log(res.data)
        this.setState({ listCart: res.data, selectEditCart: 0 })
    }).catch((err) => {
        console.log(err)
    })
}

  onBtnEditClick = (id) => {
    this.setState({selectEditCart : id})
}

onBtnRemoveClick = (id) => {
if(window.confirm('Are you sure?')) {
    axios.delete('http://localhost:1971/cart/' + id)
    .then((res) => {
        this.getCartList()
    }).catch((err) => {
        console.log(err)
    })
}

}
onBtnSaveClick = (id) => {
    var nama_product = this.refs.namaEdit;
    var id_produk = this.refs.produkEdit;
    var img = this.refs.imgEdit;
    var harga_produk = this.refs.hargaEdit;
    var kuantitas = this.refs.qtyEdit;
    var total = this.refs.totalEdit;

    axios.put('http://localhost:1971/cart/' + id, {
        nama_product, id_produk, img, harga_produk, kuantitas, total, id
    }).then((res) => {
        this.getCartList();
    }).catch((err) => {
        console.log()
    })
}

  renderListCart = (id) => {
    axios.get('http://localhost:1971/cart' , {
      params : {
        username : this.props.username
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({listCart : res.data})
    })
    var listJsx = this.state.listCart.map((val) => {
        if(id === this.state.selectEditCart) {
            return(
                <tr>
                    <td>{val.id_produk}</td>
                    <td>{val.nama_product}</td>
                    <td><img src={val.img} width="100px" alt={val.id}/></td>
                    <td>{rupiah.format(val.harga_produk)}</td>
                    <td style={{width:'20px'}}><input type="number" ref="qtyEdit" defaultValue={val.kuantitas}/></td>
                    <td style={{width:'20px'}}>{rupiah.format(val.total)}</td>
                    <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({selectEdit: 0})}/></td>
                </tr>
          
            )
        } return (
                 <tr>
                    <td>{val.id_produk}</td>
                    <td>{val.nama_product}</td>
                    <td><img src={val.img} width="100px" alt={val.id}/></td>
                    <td>{rupiah.format(val.harga_produk)}</td>
                    <td style={{width:'20px'}}>{val.kuantitas}</td>
                    <td style={{width:'20px'}}>{rupiah.format(val.total)}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditClick(id)}/></td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnRemoveClick(id)}/></td>
                </tr>
        )
     
    })

    return listJsx;
  }
  onCheckOut = () => {
    if(window.confirm('Are you sure?')) {
        axios.post('http://localhost:1971/history', {
        username : this.props.username,
        order : this.state.listCart
        })
        .then((res) => {
            console.log(res)
            for(let i = 0 ; i < this.state.listCart.length ; i ++){
                axios.delete('http://localhost:1971/cart/' + this.state.listCart[i].id    
                ).then((res) => {
                console.log(res)     
                this.renderListCart()      
                })
            }
         })
    }
    
  }

  renderTotalHarga = () => {
    var a = 0
    for(let i = 0; i < this.state.listCart.length ; i++){
      a += this.state.listCart[i].total
    }
    return(
      <div className='col-2'>
      <h4>Total Price : {rupiah.format(a)}</h4>
      <br></br>
       <Input className="btn-success" type='button' value='CHECKOUT' onClick ={this.onCheckOut}/>
      </div>
    )
  }

    


  render() {
    if(this.state.listCart.length > 0){
      return (
        <div className='container'>
        <center>
            <h1 style={{marginTop:'20px'}}>
                CART
            </h1>
        </center>
      <Table style={{marginTop:'40px'}}>
        <thead>
          <tr>
            <th>ID</th>  
            <th>Nama Produk</th>
            <th>Image</th>           
            <th>Harga Item</th>
            <th>Kuantitas</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        {this.renderListCart()}
        
      </Table>
      <center>
          {this.renderTotalHarga()}
      </center>
      </div>
    );
    }else{
      return(
        <center>
          <div className='col-3'>
          <h1>Keranjang anda kosong</h1>
          <br></br>
          <Link to='/productlist'><Input type="button" className='btn btn-secondary' value="Lanjutkan Belanja"/></Link>          
          </div>
        </center>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps)(Cart)