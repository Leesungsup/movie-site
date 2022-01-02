import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button} from 'antd'
function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const movieId=props.movieId
    const userFrom=props.userFrom
    const movieTitle=props.movieInfo.title
    const moviePost=props.movieInfo.backdrop_path
    const movieRunTime=props.movieInfo.runtime
    let variable={
        userFrom:userFrom,
        movieId:movieId,
        moviePost:moviePost,
        movieTitle:movieTitle,
        movieRunTime:movieRunTime
    }
    useEffect(() => {
        axios.post('/api/favorite/number',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)
            }else{
                alert("숫자 정보를 가져오는데 실패했습니다.")
            }
        })
        axios.post('/api/favorite/favorited',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setFavorited(response.data.favorited)
            }else{
                alert("정보를 받아오지 못했습니다.")
            }
        })
    }, [])
    const onClickFavorite=()=>{
        if(Favorited){
            axios.post('/api/favorite/removeFromFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                }else{
                    alert("Favorite에서 지우는 것을 실패하였습니다.")
                }
            })
        }else{
            axios.post('/api/favorite/addToFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited)
                }else{
                    alert("Favorit에서 추가하는 것을 실패하였습니다.")
                }
            })
        }
    }
    return (
        <div>
            <Button onClick={onClickFavorite}>
            {Favorited ? " Not Favorite" : "Add to Favorite "} {FavoriteNumber}
            </Button>
        </div>
    )
}

export default Favorite
