import { useCallback, useState } from 'react';
import Link from 'next/link';
import { products } from '../cache/data';

const SearchBar = () => {
  const [results, setResults] = useState([]);

  const onChange = useCallback((event) => {
    const query = event.target.value;
    if (query.length) {
      setResults(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  }, []);
  return (
    <div className="w-64 relative">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="px-1 py-1 rounded-sm focus:outline-0 w-full"
          onChange={onChange}
        />
      </div>
      <div>
        <ul className="absolute z-50  rounded-sm w-full right-0">
          {results.map((item, index) => (
            <li
              className="px-2 py-2 border-t bg-white text-sm ease-in duration-150 hover:text-red-700"
              key={index}
            >
              <Link href={`/products/${item.slug}`}>
                <a onClick={() => setResults([])}>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
