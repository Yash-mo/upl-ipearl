export default function Rating({ rating }) {


    return (
        <div className="rating">
            {
                rating < 1 ? (
                    <>
                        <i className="fa-solid fa-star-half"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating === 1 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating < 2 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating === 2 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating < 3 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating === 3 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating < 4 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half"></i>
                        <i className="fa-regular fa-star"></i>
                    </>
                ) : rating === 4 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>

                    </>
                ) : rating < 5 ? (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half"></i>
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </>
                )
            }
        </div>

    )
}