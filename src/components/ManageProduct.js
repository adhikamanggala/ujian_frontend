import React, { Component } from 'react'
import axios from 'axios'
import '../support/css/styleTable.css'

class ManageProduct extends Component {
    state = { listProduct: [], selectEdit : 0 }

    componentDidMount() {
        this.getProductList();
    }

    getProductList = () => {
        var kacrutPromise = axios.get('http://localhost:1971/popok')
        kacrutPromise.then((res) => {
            // console.log(res.data)
            this.setState({ listProduct: res.data, selectEdit: 0 })
        }).catch((err) => {
            console.log()
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merk = this.refs.merkAdd.value;
        var harga = this.refs.hargaAdd.value;
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post( 'http://localhost:1971/popok', {
            nama, merk, harga, img, description
        }).then((res) => {
            this.getProductList();
        }).catch((res) => {
            console.log()
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete('http://localhost:1971/popok/' + id)
            .then((res) => {
                this.getProductList()
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    onBtnEditClick = (id) => {
        this.setState({selectEdit : id})
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var merk = this.refs.merkEdit.value;
        var img = this.refs.imgEdit.value;
        var harga = this.refs.hargaEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:1971/popok/' + id, {
            nama, merk, img, harga, description
        }).then((res) => {
            this.getProductList();
        }).catch((err) => {
            console.log()
        })
    }


    renderBodyProduct = () => {
        var listJSXProduct = this.state.listProduct.map(({ id, nama, merk, harga, description, img}) => {
            if(id === this.state.selectEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama}/></td>
                        <td><input type="text" ref="merkEdit" defaultValue={merk}/></td>
                        <td><input type="number" ref="hargaEdit" defaultValue={harga}/></td>
                        <td><input type="text" ref="imgEdit" defaultValue={img} width="50px" alt={id}/></td>
                        <td><textarea ref="descEdit" defaultValue={description}/></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({selectEdit: 0})}/></td>
                    </tr>
                 )
            }
            return (
               <tr>
                   <td>{id}</td>
                   <td>{nama}</td>
                   <td>{merk}</td>
                   <td>{harga}</td>
                   <td><img src={img} width="50px" alt={id}/></td>
                   <td>{description}</td>
                   <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditClick(id)}/></td>
                   <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)}/></td>
               </tr>
            )
            })
            return listJSXProduct;
        }

    render () {
        return (
            <div align="center" className="container-fluid">
                <h3>Manage Product</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduct()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input ref="namaAdd" type="text" placeholder="Nama Product"/>
                            </td>
                            <td>
                               <input ref="merkAdd" type="text" placeholder="Nama Brand">
                                   {/* <option>Nusa Tenggara</option>
                                   <option>Bali</option>
                                   <option>Jawa</option> */}
                               </input>
                            </td>
                            <td>
                                Rp. <input ref="hargaAdd" type="number" placeholder="Harga"/>
                            </td>
                            <td>
                                <input ref="imgAdd" type="text" placeholder="Image URL"/>
                            </td>
                            <td>
                                <textarea ref="descAdd"placeholder="Enter the description here"></textarea>
                            </td>
                            <td>
                                <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
export default ManageProduct;