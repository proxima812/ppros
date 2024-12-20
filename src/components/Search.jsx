const Search = ({ query, setQuery }) => {
	return (
		<input
			type="text"
			placeholder="Поиск по: названию, сообществу, времени, формату, описанию, контакту и ссылке..."
			value={query}
			onChange={e => setQuery(e.target.value)}
			className="w-full rounded-xl p-3 mb-5 border"
		/>
	)
}

export default Search
