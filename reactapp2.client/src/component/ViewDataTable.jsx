/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
const ViewDataTable = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([])
    const [visibleData, setVisibleData] = useState()
    const fetchSavedData = async () => {
        const response = await fetch('https://localhost:7122/api/getAllProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setProducts(data)
    }
    useEffect(() => {
        fetchSavedData()
    },[])
    useEffect(()=>{
        const filterSearch = search.length !== 0
            ? products.filter(item => {
                return item.productName.toLowerCase().includes(search.toLowerCase())
            })
            : products
        setVisibleData(filterSearch)
    }, [products,search])
    return (
        <>
            <div className='card-header border-0 display-space-between'>
                <div className="card-title">
                    <div className="d-flex align-items-center position-relative my-1">
                        <input
                            type='text'
                            placeholder='Search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='card card-body'>
                <div className='table-responsive scrollbar'>
                    <table
                        className="table align-middle table-row-dashed table-hover dataTable no-footer gy-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-light">
                            {visibleData ? (visibleData.map((data) => {
                                return (
                                    <tr key={data.key}>
                                        <td>{data.productId}</td>
                                        <td>{data.productName}</td>
                                        <td>{data.unitPrice}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.totalAmount}</td>
                                    </tr>
                                )
                            })
                            ) : 'No Data'}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewDataTable