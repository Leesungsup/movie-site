import React,{useEffect,useState} from 'react'
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/Mainimage'
import MovieInfo from './Sections/MovieInfo'
import {Row,Button} from 'antd';
import GridCards from '../commons/GridCards';
function MovieDetail(props) {
    let movieId=props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    useEffect(() => {
        let endpointCrew=`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo=`${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpointInfo)
        .then(response=>response.json())
        .then(response=>{
            console.log(response)
            setMovie(response)
        })
        fetch(endpointCrew)
        .then(response=>response.json())
        .then(response=>{
            console.log(response)
            setCasts(response.cast)
        })
    }, [])
    const toggleActorView=(e)=>{
        
        setActorToggle(!ActorToggle)
    }
    return (
        <div>
            {Movie.backdrop_path &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <MovieInfo 
                movie={Movie}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>
                {ActorToggle &&
                <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast,index)=>(
                        <React.Fragment key={index}>
                            <GridCards
                            image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                            characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                }
                <br />

            </div>
        </div>
    )
}

export default MovieDetail
