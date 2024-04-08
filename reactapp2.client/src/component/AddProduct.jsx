import { useState } from 'react';
import { Form, Formik, Field } from 'formik'



const AddProducts = () => {
    const [cartItems, setCartItems] = useState([]);

    const handleSubmit = (values, { resetForm }) => {
        // Update the array with new form values
        setCartItems(prevItems => [...prevItems, values])
        // Reset the form after submission
        resetForm();
    };
    const handleRemove = (index) => {
        const updatedPlan = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedPlan);
    }
    const SaveData = async (event) => {
        event.preventDefault();
        let obj = []
        cartItems.forEach((item) => {
            const productData = {
                productName: item.productName,
                unitPrice: parseFloat(item.cost),
                quantity: parseInt(item.quantity),
                productId: parseInt(item.productId),
                totalAmount: parseFloat((parseFloat(item.cost) * parseInt(item.quantity)).toFixed(2))
            }
            obj.push(productData)
        })

        try {
            const response = await fetch('https://localhost:7122/api/SaveProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            // Reset form fields

            alert('Product added successfully!');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <div>
            <h2>Cart Items</h2>

            <Formik
                initialValues={{
                    productId: '',
                    productName: '',
                    cost: '',
                    quantity: '',
                    amount: ''
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='form-group'>
                            <Field
                                className='form-control'
                                type='text'
                                name='productId'
                                placeholder='Product Id'
                            />
                            <Field
                                className='form-control'
                                type='text'
                                name='productName'
                                placeholder='Product Name'
                            />
                            
                        </div>
                        <div className='form-group'>
                            <Field
                                className='form-control'
                                type='text'
                                name='quantity'
                                placeholder='Quantity'
                            />
                            <Field
                                className='form-control'
                                type='text'
                                name='cost'
                                placeholder='Cost'
                            />
                        </div>
                        <div className='form-group'>
                            <button
                                type='submit'
                                className='btn btn-success btn-block btn-sm'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding to Cart...' : 'Add to Cart'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-light">
                            {cartItems ? (cartItems.map((data, index) => {
                                return (
                                    <tr key={data.key}>
                                        <td>{data.productId}</td>
                                        <td>{data.productName}</td>
                                        <td>{data.cost}</td>
                                        <td>{data.quantity}</td>
                                        <td>{(parseFloat(data.cost) * parseInt(data.quantity)).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemove(index)}
                                            >Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                            ) : 'No Data'}

                        </tbody>
                    </table>
                </div>
            </div>
            <button
                onClick={(e) => SaveData(e)}
            > Save</button>
        </div>
    );
}

export default AddProducts
