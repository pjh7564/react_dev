import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

const BoardDelete = () => {
    const params = useParams()
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${API_URL}/api/delete/${params.id}`, {
            method: "POST"
        }).then(res => {
            if (res.ok) {
                alert("삭제완료")
                navigate('/')
            }
        })
    }, [])

    return(
        <p></p>
    )
}

export default BoardDelete