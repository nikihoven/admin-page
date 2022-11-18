const App = () => {
    return (
        <main className="main">
            <section className="main__half">
                <h1 className="heading">Админ панель</h1>
                <form className="form">
                    <label className="form__label">Получить статус очереди
                        <input className="form__input" placeholder="Введите id" type="text"/>
                    </label>
                    <button className="form__button">Получить статус</button>
                </form>
                <form className="form">
                    <label className="form__label">Поставить ссылки в очередь
                        <input className="form__input" placeholder="Введите список ссылок через пробелы" type="text"/>
                    </label>
                    <button className="form__button">Отправить в очередь</button>
                </form>
            </section>

            <section className="main__half">
                <h2>Результат</h2>
            </section>
        </main>
    )
}

export {App}
