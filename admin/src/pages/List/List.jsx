import { useState } from 'react'
import './List.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const List = ({url}) => {

    const [list, setList] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [search, setSearch] = useState("");


    // const fetchList = async () => {
    //     const response = await axios(`${url}/api/food/list`);
    //     console.log(response.data);
    //     if (response.data.success) {
    //         setList(response.data.data);
    //     } else {
    //         toast.error("Error fetching data");
    //     }
    // }

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`, {
                params: { search }
            });
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching data");
            }
        } catch (err) {
            toast.error("Error fetching data");
        }
    };


    const removeFood = async (foodId) => {
        const confirmed = window.confirm("Are you sure you want to delete this dish?");
        if (!confirmed) return;

        const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleUpdateFood = async () => {
        const formData = new FormData();
        formData.append("id", editItem._id);
        formData.append("name", editItem.name);
        formData.append("category", editItem.category);
        formData.append("price", editItem.price);
        if (editItem.imageFile) {
            formData.append("image", editItem.imageFile);
        }

        try {
            const response = await axios.post(`${url}/api/food/update`, formData);
            if (response.data.success) {
            toast.success("Food updated successfully");
            setEditItem(null);
            fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update food");
        }
    };


    useEffect(() => {
        fetchList();
    }, [])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='search-section'>
            <p>Search: </p>
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Search food by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button onClick={fetchList}>Search</button>
        </div>
        
        <div className='list-table'>
            <div className='list-table-format title'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index) => {
                return (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/` + item.image} alt=''/>
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price.toLocaleString('en-US').replace(/,/g, ' ')} VND</p>
                       <div className="action-buttons">
                            <p className="edit-button cursor" onClick={() => setEditItem(item)}>Edit</p>
                            <p className="remove-button cursor" onClick={() => removeFood(item._id)}>Remove</p>
                        </div>
                    </div>
                )
            })}
            {editItem && (
            <div className="modal-overlay">
                <div className="modal">
                <h3>Edit Food</h3>

                <input
                    type="text"
                    placeholder="Name"
                    value={editItem.name}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
                <select
                    value={editItem.category}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
        
                </select>
                <input
                    type="number"
                    placeholder="Price"
                    value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => setEditItem({ ...editItem, imageFile: e.target.files[0] })}
                />

                <div className="modal-actions">
                    <button className='update-btn' onClick={() => setEditItem(null)}>Cancel</button>
                    <button className='update-btn' onClick={handleUpdateFood}>Save</button>
                </div>
                </div>
            </div>
            )}
        </div>
     </div>
  )
}

export default List;