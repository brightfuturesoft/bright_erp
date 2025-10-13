import DataTable from './Data_Table';

const Wishlist = ({ userWishlist }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Customer Wishlist Items</h2>
            <DataTable data={userWishlist} />
        </div>
    );
};

export default Wishlist;
