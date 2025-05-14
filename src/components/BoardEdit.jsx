import { useParams, useNavigate, Link } from "react-router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./BoardEdit.css" // 추가: 스타일 파일

const BoardEdit = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm()

    const [board, setBoard] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    function requestFetchBoard() {
        fetch(`${API_URL}/api/read/${params.id}`)
            .then(response => response.json())
            .then(result => {
                setBoard(result[0])
            })
    }

    useEffect(() => {
        requestFetchBoard()
    }, [])

    useEffect(() => {
        setValue("subject", board.SUBJECT)
        setValue("board_body", board.board_body)
    }, [board])

    const submitForm = (data) => {
        const formData = new FormData()
        formData.append("subject", data.subject)
        formData.append("board_body", data.board_body)
        formData.append("file", data.file[0])

        fetch(`${API_URL}/api/board/update/${params.id}`, {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.ok) {
                alert("게시글 수정이 완료되었습니다")
                navigate(`/detail/${params.id}`)
            } else {
                alert("게시글 수정에 실패했습니다")
            }
        })
    }

    return (
        <div className="board-edit-container">
            <div className="board-edit-header">
                <Link to={`/detail/${params.id}`} className="btn btn-secondary">뒤로가기</Link>
                <h1 className="board-edit-title">게시글 수정</h1>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className="board-edit-form">
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="제목을 입력하세요"
                        className="form-control"
                        {...register("subject", {
                            required: "제목은 필수입력입니다."
                        })}
                    />
                    {errors.subject && <span className="danger">{errors.subject.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="board_body" className="form-label">내용</label>
                    <textarea
                        rows="6"
                        name="board_body"
                        id="board_body"
                        placeholder="내용을 입력하세요"
                        className="form-control"
                        {...register("board_body", {
                            required: "내용은 필수입력입니다.",
                            minLength: { value: 10, message: "내용은 10자 이상 입력바랍니다." }
                        })}
                    ></textarea>
                    {errors.board_body && <span className="danger">{errors.board_body.message}</span>}
                </div>
                {board.thumbnail_file_id !== null && (
                    <div className="mb-3">
                        <label className="form-label">현재 이미지</label>
                        <img src={`${API_URL}${board.file_path}`} alt="Thumbnail" className="board-edit-thumbnail" />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">이미지 파일</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="form-control"
                        {...register("file")}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>수정</button>
            </form>
        </div>
    )
}

export default BoardEdit