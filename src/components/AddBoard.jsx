import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router"
import "./AddBoard.css" // 추가: 스타일 파일

const AddBoard = () => {
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const API_URL = import.meta.env.VITE_API_URL

    const addBoard = (data) => {
        const form = new FormData()
        form.append("file", file)
        form.append("subject", data.subject)
        form.append("board_body", data.board_body)

        fetch(`${API_URL}/api/board/create`, {
            method: "POST",
            body: form
        }).then(() => navigate("/"))
    }

    return (
        <div className="add-board-container">
            <div className="add-board-header">
                <Link to="/" className="btn btn-secondary">뒤로가기</Link>
                <h1 className="add-board-title">게시글 작성</h1>
            </div>
            <form onSubmit={handleSubmit(addBoard)} className="add-board-form">
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
                    />
                    {errors.board_body && <span className="danger">{errors.board_body.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">이미지 파일</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="form-control"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">추가</button>
            </form>
        </div>
    )
}

export default AddBoard