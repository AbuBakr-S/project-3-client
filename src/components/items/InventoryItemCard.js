import React from 'react'
import { useHistory } from 'react-router'
import { toggleShareStatus, deletePersonalisedItem ,editPersonalisedItem } from '../../lib/api'

function InventoryItemCard({ name, category, icon, id, quantity, expiryDate, shareStatus }) {
  
  const history = useHistory()

  const [isShareClicked, setisShareClicked] = React.useState(shareStatus)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await toggleShareStatus(id, !shareStatus)
      // history.push('/inventoryitemsmap')
      setisShareClicked(!isShareClicked)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      console.log('Delete')
      console.log('Inventory Item ID: ', id)
      console.log(deletePersonalisedItem(id))
      await deletePersonalisedItem(id)
      history.go(0)
    } catch (err) {
      console.log(err)
    }
  }
  
  const [isButtonClicked, setEditButtonClicked] = React.useState(false)
  const [newQuantity, setNewQuantity] = React.useState(null)

  const handleEdit = (e) => {
    try {
      setEditButtonClicked(!isButtonClicked)
      console.log(e.target.value)
    } catch (err){
      console.log(err)
    }
  }  
  
  const handleSave = async () => {
    try {
      await editPersonalisedItem(id, newQuantity)
      console.log(newQuantity)
      history.go(0)
    } catch (err){
      console.log(err)
    }
  }  
  
  return (
    <div className="card m-5">
      <div className="card-image">
        <figure className="image is-2by1">
          <img src={icon} alt={name} />
        </figure>
      </div>
      {!isButtonClicked ? 
        <>
          <div className="card-content">
            <p className="mb-2 is-capitalized has-text-weight-bold">Name: <span className="has-text-weight-normal">{name}</span></p>
            <p className="mb-3 is-capitalized has-text-weight-bold">Category: <span className="has-text-weight-normal">{category}</span></p>
            <p className="mb-3 is-capitalized has-text-weight-bold">Quantity: <span className="has-text-weight-normal">{quantity}</span></p>
            <p className="mb-3 is-capitalized has-text-weight-bold">Expiry Date: <span className="has-text-weight-normal">{new Date(expiryDate).toLocaleDateString()}</span></p>
          </div>
          <button 
            type="submit"
            className="button is-info mb-3"
            name='quantity'
            onClick={handleEdit}
          >
            Edit Quantity
          </button>
        </>
        :
        <>
          <div className="card-content">
            <p className="mb-2 is-capitalized has-text-weight-bold">Name: {name}</p>
            <p className="mb-2 is-capitalized has-text-weight-bold">Category: {category}</p>
            <label className="is-capitalized has-text-weight-bold" htmlFor="quantity">Quantity: </label>
            <input className="mb-2" type="number" id="quantity" 
              placeholder={quantity} 
              onChange={event => setNewQuantity({
                'quantity': `${event.target.value}`,
              })}
            />
            <p className="mb-2 is-capitalized has-text-weight-bold">Expiry Date: <span className="has-text-weight-normal">{new Date(expiryDate).toLocaleDateString()}</span></p>
          </div> 

          <button 
            type="submit"
            className="button is-warning mb-3"
            name='quantity'
            onClick={handleSave}
          >
            Save Changes
          </button>
        </>
      }

      {isShareClicked ?
        <button 
          type="submit"
          className="button is-success mb-3"
          onClick={handleSubmit}
        >
        Item Shared
        </button>
        :
        <button 
          type="submit"
          className="button is-dark mb-3"
          onClick={handleSubmit}
        >
        Share
        </button>
      }

      <button 
        type="submit"
        className="button is-danger mb-3"
        name='quantity'
        onClick={handleDelete}
      >
        Delete
      </button>

    </div>
  ) 
}

export default InventoryItemCard

