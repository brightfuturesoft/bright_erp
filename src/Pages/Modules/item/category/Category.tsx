import { categories } from './Category.demo';
import { renderCategories } from './Category.utils';

const Category = () => {
    return (
        <div className="mx-auto  text-black dark:text-white">
            <div className="flex justify-between">
                <h3 className="text-xl">All Categories</h3>
                <div>Search and button</div>
            </div>

            <div className="">{renderCategories(categories)}</div>
        </div>
    );
};

export default Category;
