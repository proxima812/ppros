import Fuse from "fuse.js"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { supabase } from "../supabaseClient"
import GroupCard from "./GroupCard"
import Loader from "./Loader"
import Search from "./Search"

const fetcher = async () => {
	const { data, error } = await supabase.from("groups").select("*")
	if (error) throw error
	return data
}

const GroupList = () => {
	const { data, error, isLoading, mutate } = useSWR("groups", fetcher, {
		revalidateOnFocus: true, // Перезапрос данных при возвращении на страницу
	})

	const [searchQuery, setSearchQuery] = useState("")
	const [filteredData, setFilteredData] = useState([])

	// Подписываемся на изменения данных в реальном времени
	useEffect(() => {
		const subscription = supabase
			.channel("realtime:groups")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "groups" },
				payload => {
					console.log("Изменения в данных:", payload)
					mutate() // Перезагружаем данные из кэша
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(subscription) // Отписываемся при размонтировании
		}
	}, [mutate])

	// Обновляем фильтрованные данные при изменении запроса или данных
	useEffect(() => {
		if (data) {
			if (searchQuery.trim() === "") {
				setFilteredData(data)
			} else {
				const fuse = new Fuse(data, {
					keys: ["name", "description", "time", "format", "community", "contact", "link"], // Поля для поиска
					threshold: 0.4, // Чувствительность поиска
				})
				setFilteredData(fuse.search(searchQuery).map(result => result.item))
			}
		}
	}, [data, searchQuery])

	if (error) return <div>Ошибка при загрузке данных: {error.message}</div>

	return (
		<div className="container justify-center items-center px-5">
			<Search query={searchQuery} setQuery={setSearchQuery} />

			{isLoading && !data ? (
				<div className="md:grid-cols-2 grid-cols-1 lg:grid-cols-3 grid gap-5">
					<Loader />
					<Loader />
					<Loader />
				</div>
			) : filteredData?.length > 0 ? (
				<section className="w-full columns-1 md:columns-2 lg:columns-3 gap-5">
					{filteredData.map(cardData => (
						<GroupCard key={cardData.id} card={cardData} />
					))}
				</section>
			) : (
				<div>Нет данных</div>
			)}
		</div>
	)
}

export default GroupList
