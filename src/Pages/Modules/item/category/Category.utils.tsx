import Demo from './components/Demo';
import Demo2 from './components/Demo2';
import Row from './components/Row';

interface Category {
    id: number;
    name: string;
    children?: Category[];
}

type RenderCategoriesType = (categories: Category[]) => JSX.Element[];

const renderCategories: RenderCategoriesType = categories => {
    // return categories.map(category => (
    //     <Row
    //         title={category.name}
    //         key={category.id}
    //     >
    //         {category.children &&
    //             category.children.length > 0 &&
    //             renderCategories(category.children)}
    //     </Row>
    // ));
    return (
        <>
            <Demo />
            <Demo2 />
        </>
    )
};

export { renderCategories };
