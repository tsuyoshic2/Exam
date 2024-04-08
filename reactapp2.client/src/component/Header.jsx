


// eslint-disable-next-line react/prop-types
const Header = ({ setSearch, search }) => {

    return (
        <div className='card-header border-0 display-space-between'>
            <div className="card-title">
                <div className="d-flex align-items-center position-relative my-1">
                    <input
                        type='text'
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header