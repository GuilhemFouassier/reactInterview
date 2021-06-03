import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviePreview from "../../components/moviePreview";
import { retrieveMovies, getMovies, resetMovies } from "../../store/movies";
import ReactPaginate from 'react-paginate';
import './index.scss';
import Select from "../../components/Select";

const Home = () => {
    const dispatch = useDispatch();
    const movies= useSelector(getMovies);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    const number = [
        {label: '4', value: 4},
        {label: '8', value: 8},
        {label: '12', value: 12}
    ];
    let currentPageData = [];
    let pageCount;
    let categories = [];

    useEffect(()=> {
        if(!movies.length){
            dispatch(retrieveMovies());
        } 
    })

    if(movies.length){
        currentPageData = movies[0]
        .slice(offset, offset + perPage)
        .map((movie, index) => <MoviePreview key={index} movie={movie}/>);
        pageCount =Math.ceil(movies[0].length / perPage); 
        
        movies[0].forEach(movie => {
            let object = {label : movie.category, value: movie.category};
            if(!categories.find(category => category['label'] === movie.category)){
                categories.push(object);
            }
        });
    }

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const selectChange = (event) => {
        setPerPage(event.target.value);
    }
    const selectCategory = (event) => {
        currentPageData = movies[0]
        .filter(movie => movie.category === event.target.value)
        .slice(offset, offset + perPage)
        .map((movie, index) => <MoviePreview key={index} movie={movie}/>);
        pageCount = Math.ceil(currentPageData.length / perPage);
    }


    return (
        <main className="container">
                <section className="row">
                <div className="col-12 option-bar">
                    <Select
                        label="Quantité: "
                        options={number}
                        name="quantity"
                        id="quantity"
                        value={perPage}
                        handleChange={selectChange}
                        />
                     <Select
                        label="Catégorie: "
                        options={categories}
                        name="categories"
                        id="categories"
                        value={null}
                        handleChange={selectCategory}
                        />
                        </div>
                </section>
                <section className="row">
                { movies.length !== 0 ? (
                       currentPageData
                    )
                    :
                    <>
                    </>
                }
                </section>
                <section className="row">
                    <div className="col-12">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                    </div>
                </section>
        </main>
    )
}

export default Home