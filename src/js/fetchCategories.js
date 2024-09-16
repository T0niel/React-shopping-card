export default async () => {
    try{
        const res = await fetch('https://dummyjson.com/products/category-list');

        if(res.status < 200 || res.status > 299){
            throw new Error(res.status);
        }

        const data = await res.json();
        return data;
    }catch(e){
        console.error(`Error: ${e.message}`);
        return [];
    }
}