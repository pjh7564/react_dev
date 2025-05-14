import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import moment from "moment"
import { Link } from "react-router"
import Pagination from "./Pagination"
import "./ListBoard.css" // 추가: 커스텀 스타일 파일

const ListBoard = () => {
    const [boards, setBoardList] = useState([])
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const API_URL = import.meta.env.VITE_API_URL

    function getList(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setBoardList(data.boards)
            setTotalPages(data.totalPages)
        })
    }

    useEffect(() => {
        getList(`${API_URL}/api/board?page=${page}`)
    }, [page])

    const handleSearchUser = () => {
        console.log('현재페이지: ', page)
    }

    const setCurrentPageNumber = page => {
        setPage(page)
    }

    return (
        <div className="container mt-5 text-white custom-container">
            <div className="text-center mb-4">
                <h2 className="custom-title">ChatGPT 검색기능 추가</h2>
                <Link to={`/search_gpt`}>
                    <button className="btn btn-primary btn-lg px-4 me-sm-3 fw-bold custom-button">ChatGPT 검색</button>
                </Link>
            </div>

            <div className="text-secondary px-4 py-5 text-center custom-header">
                <h1 className="display-5 fw-bold text-white">박지훈의 리액트&노드 익스프레스 공부</h1>
            </div>
            
            <h2 className="custom-subtitle">
                게시판 글작성
                <button 
                    className="btn btn-success btn-lg px-4 me-sm-3 fw-bold custom-button" 
                    onClick={() => navigate('/addBoard')}
                >
                    글쓰기
                </button>
            </h2>
            <table className="table table-dark table-striped table-hover custom-table">
                <thead>
                    <tr>
                        <th>게시글번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map(board => (
                        <tr key={board.board_id}>
                            <td>{board.board_id}</td>
                            <td>
                                <Link to={`/detail/${board.board_id}`} className="custom-link">
                                    {board.SUBJECT}
                                </Link>
                            </td>
                            <td>{moment(board.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                totalPages={totalPages} 
                handleSearchUser={handleSearchUser} 
                setCurrentPageNumber={setCurrentPageNumber}
            />
            <div className="custom-footer">
                <p>업데이트 내역</p>
                <ul>
                    <li>게시글 수정&삭제 기능 추가</li>
                    <li>페이징 기능 추가</li>
                    <li>이미지 저장 방식 변경</li>
                </ul>
                <p>추가할 기능</p>
                <ul>
                    <li>게시글 삭제 시 서버에서 이미지 삭제</li>
                    <li>게시글 수정 시 저장된 이미지 노출 및 수정</li>
                    <li>로그인 기능 추가</li>
                </ul>
            </div>
        </div>
    )
}

export default ListBoard