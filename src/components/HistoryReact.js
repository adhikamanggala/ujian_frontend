import React from 'react';
import { Table } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class History extends React.Component {
    state = {listHistory : []}
  componentDidMount(){
    this.renderListHistory()
  }

  renderListHistory = () => {
    axios.get('http://localhost:1971/history' , {
      params : {
        username : this.props.username
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({listHistory : res.data})
    })
    var listJsx = this.state.listHistory.map((val) => {
      
        return(
        
          <tr>
            <th>{val.id_produk}</th>  
            <th><img src={val.img} width="50px" alt={val.id}/></th>
            <td>{val.nama_produk}</td>
            <td>{rupiah.format(val.harga_produk)}</td>
            <td style={{width:'20px'}}>{val.kuantitas}</td>
            <td style={{width:'20px'}}>{rupiah.format(val.total)}</td>
          </tr>
          
        
      )
     
    })

    return listJsx;
  }
  

  

  render() {
    if(this.state.listHistory.length > 0){
      return (
        <div className='container'>
        <center>
            <h1 style={{marginTop:'20px'}}>
                History
            </h1>
        </center>
      <Table style={{marginTop:'40px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Tanggal Transaksi </th>
            <th>Total Item</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        {this.renderListHistory()}
        
      </Table>
      
      </div>
    );
    }else{
      return(
          <div>
        {this.renderListHistory()}
        </div>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps)(History)