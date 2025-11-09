const SearchBar = (props) => {

    const getInputValue = (e) => {
        e.preventDefault()
        props.onChange(e.target.value)
    }

    return (
        <div className='w-full px-10 py-10'>
            <div>
                <input value={props.value} onChange={(e) => {
                    getInputValue(e)
                }} className='py-2 w-full px-5 text-white ' type="text" placeholder='Search movies...' />
            </div>
        </div>
    )
}

export default SearchBar