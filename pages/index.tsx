import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const [items, setItems] = useState([]);
  const router = useRouter();
console.log('process.env.NEXT_PUBLIC_API_URL :>> ', process.env.NEXT_PUBLIC_API_URL);
  const api = process.env.NEXT_PUBLIC_API_URL
  const fetchData = async () => {
    const response = await fetch(`${api}/items`);
    const data = await response.json();
    setItems(data);
  };
  console.log('items :>> ', items);

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">List of Templates</h2>
          <p className="mt-1 text-gray-400 dark:text-gray-400">Click to Preview the Templates</p>
        
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items && items.map((item: any) => (
            <div className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"  key={item._id} onClick={()=>{
              console.log('item.id :>> ', item._id);
              router.push({
                pathname: '/view',
                query: {
                  id: item._id
                }
              });
            }}>
              <div className="p-4 md:p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      {item.name}
                    </h3>
                  </div>
                  <div className="pl-3">
                    <svg className="w-3.5 h-3.5 text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}