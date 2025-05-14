import ReactPaginate from "react-paginate"

const Pagination = ({totalPages, handleSearchUser, setCurrentPageNumber}) => {
    const LAST_DISPLAY_SIZE = 10
    const AROUND_DISPLAY_PAGES = 5

    const handlePaginate = selectedItem => {
        // 컴포넌트 내부에서 0으로 시작하기때문에 1을 추가해줘야함
        const page = selectedItem.selected + 1
        setCurrentPageNumber(page)
        handleSearchUser()
    }

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                marginPagesDisplayed={LAST_DISPLAY_SIZE}
                pageRangeDisplayed={AROUND_DISPLAY_PAGES}
                onPageChange={handlePaginate}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="active"
                previousClassName="previous-link"
                nextLinkClassName="next-link"
                previousLabel="&lt;"
                nextLabel="&gt;"
                disabledClassName="disable-botton"
            />
        </div>
    )
}

export default Pagination