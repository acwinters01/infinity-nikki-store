import { InventoryForm } from '../components/inventory/InventoryForm';


const InventoryPage = () => {
    return(
        <div>
            <h2 className='form-title'>Add New Item</h2>
            <InventoryForm onSuccess={(item) => console.log('Saved:', item)}/>
        </div>
    )
}

export default InventoryPage;