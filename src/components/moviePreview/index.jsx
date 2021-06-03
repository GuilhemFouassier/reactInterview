import './index.scss';
import PropTypes from 'prop-types';
import like from '../../assets/img/icons/like.svg';
import dislike from '../../assets/img/icons/dislike.svg';
import { useDispatch } from "react-redux";
import { editMovies, removeMovies } from "../../store/movies";


const MoviePreview = ({ movie }) => {
    const dispatch = useDispatch();

    const addLike = (event) => {
        if(localStorage.getItem('user')){
            let like = movie.likes - 1;
            let dislike = movie.dislikes + 1;
            let updateMovie = {
                id: movie.id,
                title: movie.title,
                category: movie.category,
                likes: like,
                dislikes: movie.dislike
            }
            dispatch(editMovies(updateMovie));
            localStorage.removeItem('user');
            event.target.innerHTML= 'je like';
        }else{
            let like = movie.likes + 1;
            let updateMovie = {
                id: movie.id,
                title: movie.title,
                category: movie.category,
                likes: like,
                dislikes: movie.dislikes
            }
            dispatch(editMovies(updateMovie));
            localStorage.setItem('user', true);
            event.target.innerHTML= 'Unlike';
        }
    }

    const deleteMovie = () => {
        dispatch(removeMovies(movie));
    }

  return (
    <article className="col-12 col-sm-6 col-lg-4 col-xl-4 movie-teaser">
        <div className="wrapper">
        <picture>
            <img src="https://posterstore.fr/images/zoom/130-frida-floral.jpg" alt="" />
            <figcaption>{movie.category}</figcaption>
        </picture>
        <div className="content">
            <h2>{movie.title}</h2>
            <div className="notice">
                <p className="likes"><img src={like} alt="" /> {movie.likes}</p>
                <p className="dislikes"><img src={dislike} alt="" />{movie.dislikes}</p>
            </div>
            <div className="flex">
                <button className="addLike" onClick={addLike}>Je like</button>
                <button className="deleteMovies"onClick={deleteMovie}> Je supprime de film</button>
            </div>
        </div>
        </div>
    </article>
  )
}

MoviePreview.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        dislikes: PropTypes.number.isRequired
    })
};

export default MoviePreview;