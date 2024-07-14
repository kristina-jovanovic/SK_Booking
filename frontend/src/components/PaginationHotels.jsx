import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function PaginationHotels({ page, setPage, maxPages }) {

    const [nextIsDisabled, setNextIsDisabled] = useState(false);
    const [prevIsDisabled, setPrevIsDisabled] = useState(true);

    function prevPage() {
        if (page >= 2) {
            page = page - 1;
            setPage(page);
            document.documentElement.scrollTop = 0;
        }

    }
    function nextPage() {
        if (page < maxPages) {
            page = page + 1;
            setPage(page);
            document.documentElement.scrollTop = 0;
        }
    }
    function changePage(pageNum) {
        setPage(pageNum);
        document.documentElement.scrollTop = 0;
    }
    useEffect(() => {
        if (maxPages === 1) {
            setNextIsDisabled(true);
            setPrevIsDisabled(true);
        }
        else if (page === maxPages) {
            setNextIsDisabled(true);
            setPrevIsDisabled(false);
        }
        else if (page == 1) {
            setNextIsDisabled(false);
            setPrevIsDisabled(true);
        }
        else {
            setNextIsDisabled(false);
            setPrevIsDisabled(false);
        }
    }, [maxPages, page]);

    return (
        <>
            <ul className="pagination">
                <li className="page-item"><Link className={`page-link ${prevIsDisabled ? "disabled" : ""}`} onClick={prevPage}>Previous</Link></li>
                {Array.from({ length: maxPages }).map((_, index) => (
                    <li className="page-item" key={index}><Link className={`page-link ${page === index + 1 ? "active" : ""}`} onClick={() => { changePage(index + 1); }}> {index + 1} </Link></li>
                ))}
                {/* <li className="page-item"><Link className={`page-link ${page === 2 ? "active" : ""}`} onClick={() => { changePage(2); }}>2</Link></li>
                <li className="page-item"><Link className={`page-link ${page === 3 ? "active" : ""}`} onClick={() => { changePage(3); }}>3</Link></li> */}
                <li className="page-item"><Link className={`page-link ${nextIsDisabled ? "disabled" : ""}`} onClick={nextPage}>Next</Link></li>
            </ul>
        </>
    )
}

export default PaginationHotels
