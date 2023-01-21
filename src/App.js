import { useState } from "react";

const PRODUCTS = [
  {category: "შაურმა", price: "$9", stocked: true, name: "პატარა"},
  {category: "შაურმა", price: "$11", stocked: true, name: "საშუალო"},
  {category: "შაურმა", price: "$14", stocked: true, name: "დიდი"},
  {category: "შაურმა", price: "$20", stocked: false, name: "დიიიიიიდი"},
  {category: "გამაგრილებელი სასმელები", price: "$1", stocked: true, name: "წყალი"},
  {category: "გამაგრილებელი სასმელები", price: "$2", stocked: true, name: "კოლა 0.5"},
  {category: "გამაგრილებელი სასმელები", price: "$2", stocked: true, name: "პეპსი 0.5"},
  {category: "გამაგრილებელი სასმელები", price: "$2", stocked: true, name: "ფანტა"},

];

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase())===-1)
      {return}

    if(inStockOnly && !product.stocked)
      {return}

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText,inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e)=>onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e)=>onInStockOnlyChange(e.target.checked)} />
        {' '}
        მარაგშია
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [FilterText, setFilterText]=useState('')
  const [inStockOnly,setInStockOnly]=useState(false)

  return (
    <div>
      <SearchBar filterText={FilterText} inStockOnly={inStockOnly} onInStockOnlyChange={setInStockOnly} onFilterTextChange={setFilterText} />
      <ProductTable products={products} filterText={FilterText} inStockOnly={inStockOnly} />
    </div>
  );
}

export default function App() {
  return(
    <div>
    <FilterableProductTable products={PRODUCTS} />
    </div>
  ) ;
}
