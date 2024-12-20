const GroupCard = ({ card }) => {
	return (
		<article
			className="break-inside-avoid-column rounded-xl p-5 border mb-5"
			card-time={card.created_at}
			id={card.id}
			key={card.id}
		>
			<div className={`flex flex-col gap-1 mb-1`}>
				<h2>
					<strong>🍀 Название:</strong> {card.name}
				</h2>
				<span>
					<strong>👥 Сообщество:</strong> {card.community}
				</span>
				<time datetime={card.time}>
					<strong>⏰ Время:</strong> {card.time}
				</time>
				{card.format && (
					<span>
						<strong>♨ Формат:</strong> {card.format}
					</span>
				)}
			</div>
			{card.description && (
				<p className="py-4 -mt-1">
					<strong>✨ Описание:</strong> {card.description}
				</p>
			)}
			<div className="flex flex-col gap-1">
				<span>
					<strong>🛜 Контакт:</strong> {card.contact}
				</span>
				{card.link && (
					<a href={card.link} target="_blank" rel="nofollow noreferrer">
						<strong>🌐 Ссылка:</strong> {card.link}
					</a>
				)}
			</div>
		</article>
	)
}

export default GroupCard

// 🍀 Название: Тест

// 👥 Сообщество: АН
// ⏰ Время: 14:00
// ♨ Формат: Спикерская

// ✨ Описание: Кнопки описание: снизу кнопка пропустить, если нет информации для добавления. И так для вопросов: формат, ссылка.

// Добавить вопрос контакт: ПГ/ПГО/ Куратор группы.

// 🛜 Контакт: @xii
// 🌐 Ссылка: @text111
