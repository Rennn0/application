import { useState } from "react";

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"},
  {category: "Saxelebi", price: "$1", stocked: false, name: "luka"},
  {category: "Saxelebi", price: "$1", stocked: true, name: "zuka"},
  {category: "Saxelebi", price: "$1", stocked: true, name: "buka"},
  {category: "Saxelebi", price: "$1", stocked: true, name: "guka"},
  {category: "gvarebi", price: "$000", stocked: true, name: "danelia"},
  {category: "gvarebi", price: "$000", stocked: true, name: "shaurma"},
  {category: "gvarebi", price: "$2", stocked: false, name: "banqo"},
  {category: "qalaqebi", price: "$99.99", stocked: true, name: "tbilisi"},
  {category: "qalaqebi", price: "$99.99", stocked: false, name: "poti"},
  {category: "qalaqebi", price: "$99.99", stocked: true, name: "xashuri"},
  {category: "nikotini", price: "$8888888", stocked: false, name: "erti"},
  {category: "nikotini", price: "$8888888", stocked: false, name: "ori"},
  {category: "nikotini", price: "$8888888", stocked: false, name: "samia"},
  {category: "nikotini", price: "$8888888", stocked: false, name: "otxi"},
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
        Only show products in stock
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