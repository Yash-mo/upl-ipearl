function Header() {

    return (
        <header className='bg-dark text-light px-3 d-flex align-items-center justify-content-between'>
            <div className="logo">
                <h3 className="mb-0 fw-bold">iPearl</h3>
            </div>

            <div className='d-flex gap-2 align-items-center py-2 text-light'>
                <span>Cart</span>
                <button type="button" className="btn btn-warning fw-bold bg-gradient">SignIn</button>
            </div>



        </header>
    )
}

export default Header;