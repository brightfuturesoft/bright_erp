import CartTable from './Cart_Table';

const Carts = ({ userCart }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Customer Cart Items</h2>
            <CartTable data={userCart} />
        </div>
    );
};

export default Carts;
