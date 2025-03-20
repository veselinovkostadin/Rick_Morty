import React, { useEffect,useState } from "react";
import { useQuery,gql } from '@apollo/client';
import CharacterCard from "./CharacterCard";
import Footer from "./Footer";


function ListCharacters(){
    const [statusFilter,setStatusFilter] = useState("");
    const [speciesFilters,setSpeciesFilters] = useState([]);
    const [speciesFilter,setSpeciesFilter] = useState("");
    const [characters,setCharacters] = useState([]);
    const [page,setPage] = useState(1);
    const [sortBy,setSortBy] = useState("");
    const [language,setLanguage] = useState("en");

    let max_pages = 1;

    const availableLanguages = {
        en:{nextBtn:"Next",prevBtn:"Prevoios",selectStatus:"Select Status",selectSpecies:"Select Species",title:"Rick and Morty characters",
            page:"Current page",sortBy:"Sort By",name:"Name",origin:"Origin",none:"None",chooseLng:"Choose Language"
        },
        mk: {
            nextBtn: "Следно",prevBtn: "Претходно",selectStatus: "Избери статус",selectSpecies: "Избери вид",title: "Ликови од Рик и Морти",
            page: "Тековна страница",sortBy: "Сортирај по",name: "Име",origin: "Потекло",none: "Нема",chooseLng:"Избери јазик"
        }
    }

    const text = availableLanguages[language]

    const GET_CHARACTERS = gql`
      query{
          characters(page: ${page}){
            info{
                pages
            }
            results{
                id,
                name,
                status,
                species,
                gender,
                origin{
                name,
                }
            }
        }
      }`;

    const {loading,error,data} = useQuery(
        GET_CHARACTERS
    )

    useEffect(() => {
        if(data){
            // if statusFilter && speciesFilter = "" always return all characters
            let filteredData = [...data.characters.results]

            if(statusFilter){
                filteredData = filteredData.filter((el) => el.status.toLowerCase() === statusFilter.toLowerCase())
            }

            if(speciesFilter){
                filteredData = filteredData.filter((el) => el.species.toLowerCase() === speciesFilter.toLowerCase()) 
            }

            if(sortBy === "name"){
                
                filteredData.sort((a,b) => a.name.localeCompare(b.name))
            }

            if(sortBy === "origin"){
                console.log(filteredData)
                filteredData.sort((a,b) => a.origin.name.localeCompare(b.origin.name))
            }

            setCharacters(filteredData);
        }
    },[data,statusFilter,speciesFilter,sortBy])

    useEffect(() => {
        if(data) setSpeciesFilters([...new Set(data.characters.results.map(el => el.species))])
    },[data])
    
    if(loading) return <h2>Loading data...</h2>
    if(error) return <h2>Something went wrong. Please try again later.</h2>
    
    
    max_pages = data.characters.info.pages;

    function decreasePage(){
        if(page > 1){
            setPage((p) => p-1)
        }
    }

    function increasePage(){
        if(page < max_pages){
            setPage((p) => p+1)
        }
    }

    function changeSortBy(e){
        e.preventDefault();
        setSortBy(e.target.value);
    }
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-center p-2">{text.title}</h1>
            <hr />
            <div className="my-2 flex justify-between">
                <select className="text-white border border-gray-300 rounded-md bg-gray-500 px-3 py-1" 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    value={statusFilter}
                >
                    <option value="">{text.selectStatus}</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select className="text-white border border-gray-300 rounded-md bg-gray-500 px-3 py-1" 
                    onChange={(e) => setSpeciesFilter(e.target.value)} 
                    value={speciesFilter}
                    >
                    <option value="">{text.selectSpecies}</option>
                    {speciesFilters.map(specie =>  <option value={specie}>{specie}</option>)}
                </select>
            </div>
            <hr />
            <div className="flex flex-row space-x-10">
                <h3>{text.sortBy}: </h3>
                <form className="space-x-8">
                    <label>{text.name} <input type="radio" value="name" onChange={(e) => changeSortBy(e)} checked={sortBy === "name"} /></label>
                    <label>{text.origin} <input type="radio" value="origin" onChange={(e) => changeSortBy(e)} checked={sortBy === "origin"}/></label>
                    <label>{text.none} <input type="radio" value="none" onChange={(e) => changeSortBy(e)} checked={sortBy === ""}/></label>
                </form>
            </div>
            <hr />
            <div className="my-2 flex justify-between items-center">
                <button className="btn border rounded border-gray-300 text-white px-3 py-1 cursor-pointer"
                    onClick={decreasePage}
                >
                    {text.prevBtn}
                </button>
                <h3 className="text-xl">Current page: {page}</h3>
                <button className="btn border rounded border-gray-300 text-white px-3 py-1 cursor-pointer"
                    onClick={increasePage}
                >
                    {text.nextBtn}
                </button>
            </div>
            <div className="space-y-5 mt-5">
                {characters.map(character => 
                    <CharacterCard key={character.id} character={character} />
                )

                }
            </div>

            <Footer language={language} setLanguage={setLanguage} text={text}/>
        </div>
        
    )

}

export default ListCharacters