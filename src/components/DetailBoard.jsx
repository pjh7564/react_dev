import { Link, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import "./DetailBoard.css" // 추가: 커스텀 스타일 파일

const DetailBoard = () => {
    const { id } = useParams()
    const [board, setBoard] = useState({}) // 객체로 초기화
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    function getBoard(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBoard(data[0]) // 보드에 배열 첫번째 값 정의
            })
    }

    // 처음 실행 되는곳
    useEffect(() => {
        getBoard(`${API_URL}/api/read/${id}`) // 뒤에 id로 체크
    }, [])

    return (
        <div className="detail-container">
            <div className="detail-header">
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    뒤로가기
                </button>
                <h1 className="detail-title">{board.SUBJECT}</h1>
            </div>
            <div className="detail-body">
                <p className="detail-content">{board.board_body}</p>
                {board.thumbnail_file_id !== null && (
                    <img
                        className="detail-thumbnail"
                        src={`${API_URL}${board.file_path}`}
                        alt="Thumbnail"
                    />
                )}
            </div>
            <div className="detail-footer">
                <Link to={`/edit/${board.board_id}`} className="btn btn-primary">
                    수정
                </Link>
                <Link to={`/delete/${board.board_id}`} className="btn btn-danger ms-2">
                    삭제
                </Link>
            </div>
        </div>
    )
}

export default DetailBoard