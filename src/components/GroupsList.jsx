import { useEffect } from "react"
import useSWR from "swr"
import supabase from "../supabaseClient"
import GroupCard from "./GroupCard"
import Loader from "./Loader"

const fetcher = async () => {
	const { data, error } = await supabase.from("groups").select("*")
	if (error) throw error
	return data
}

const GroupList = () => {
	const { data, error, isLoading, mutate } = useSWR("groups", fetcher, {
		revalidateOnFocus: true, // Перезапрос данных при возвращении на страницу
	})

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

	if (error) return <div>Ошибка при загрузке данных: {error.message}</div>

	return (
		<section className="columns-1 md:columns-2 lg:columns-3 gap-5">
			{isLoading && !data ? (
				<Loader /> // Показываем Loader только если данных в кэше нет
			) : data?.length > 0 ? (
				data.map(cardData => <GroupCard key={cardData.id} card={cardData} />)
			) : (
				<div>Нет данных</div>
			)}
		</section>
	)
}

export default GroupList
