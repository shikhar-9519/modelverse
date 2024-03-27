import React, { useEffect, useState } from 'react'
import ModelCard from './ModelCard';
import FilterComponent from './Filter';
import {
  BeatLoader,
} from "react-spinners";


export default function HomePage() {
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showAllModels, setShowAllModels] = useState(true);
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      fetchModels()
    },[showAllModels])

    useEffect(()=>{
      filterSearchModels();
    },[models, searchText])

    const fetchModels = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://models-data.onrender.com/${showAllModels ? 'models' : 'featuredModels'}`);
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models data:', error);
      }
      setLoading(false);
    };

    const filterSearchModels = () => {
      setFilteredModels(models.filter((item) => item.name.toLowerCase().startsWith(searchText.toLowerCase())));
    }
    

    return (
        <>
        <FilterComponent showAllModels={showAllModels} setShowAllModels={setShowAllModels} searchText={searchText} setSearchText={setSearchText}/>
          {loading ?  
            <div className="loader-style">
              <BeatLoader
                color={"grey"}
                loading={loading}
                size={50}
                aria-label="Loading..."
                data-testid="loader"
              />
            </div> :
            filteredModels?.length > 0 ? (
            <div className="container">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} modelData={model} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Models found</h2>
            </div>
          )}
        </>
      );
}