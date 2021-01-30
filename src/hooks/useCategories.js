import {useState, useEffect} from 'react'

const defaultCategory = {id: 0, name: "Any"};

export default function useCategories () {
    const [categories, setCategories] = useState([]);

    const insertDefaultCategory = categories => [defaultCategory, ...categories];

    const fetchCategories = async () => {
        const {data} = await categoryService.getCategories();
    
        setCategories(insertDefaultCategory(data));
    }

    useEffect(() => {
        fetchCategories();
    }, []);   

    return categories;
}