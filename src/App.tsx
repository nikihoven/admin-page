import {FormEvent, useRef, useState} from 'react'
import {axiosInstance} from './http'

interface getQueueStatusResponse {
    status: string
    data: {
        task_id: string
        task_status: string
        task_result: string
    },
}

interface setLinksToQueueResponse {
    status: string
    data: {
        task_id: string
    },
}

interface responseDataToShow {
    isError: boolean
    id?: string
    status?: string
    result?: string
}

const App = () => {
    const [resData, setResData] = useState<responseDataToShow>()
    const getStatusInputRef = useRef<HTMLInputElement>(null)
    const linksToQueueInputRef = useRef<HTMLInputElement>(null)

    const getQueueStatus = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const id = getStatusInputRef.current?.value

        if (!id) return

        try {
            const {data: {data}} = await axiosInstance.get<getQueueStatusResponse>(`/tasks/previews/${id}`)

            setResData({
                id: data.task_id,
                status: data.task_status,
                result: data.task_result,
                isError: false
            })
        } catch (e) {
            setResData({isError: true})
        }
    }

    const setLinksToQueue = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const links = getStatusInputRef.current?.value.split(' ').filter(el => !!el)

        if (!links?.length) return

        try {
            const {data: {data}} = await axiosInstance.post<setLinksToQueueResponse>('/previews', JSON.stringify(links))

            setResData({
                id: data.task_id,
                isError: false
            })
        } catch (e) {
            setResData({isError: true})
        }
    }


    return (
        <main className="main">
            <section className="main__half">
                <h1 className="heading">Админ панель</h1>
                <form onSubmit={getQueueStatus} className="form">
                    <label className="form__label">Получить статус очереди
                        <input ref={getStatusInputRef} className="form__input" placeholder="Введите id" type="text"/>
                    </label>
                    <button className="form__button">Получить статус</button>
                </form>
                <form onSubmit={setLinksToQueue} className="form">
                    <label className="form__label">Поставить ссылки в очередь
                        <input ref={linksToQueueInputRef} className="form__input"
                               placeholder="Введите список ссылок через пробелы" type="text"/>
                    </label>
                    <button className="form__button">Отправить в очередь</button>
                </form>
            </section>

            <section className="main__half">
                { resData?.isError !== undefined && <h2>{resData?.isError ? 'Произошла ошибка' : 'Результат:'}</h2>
                }
                {resData?.id && <p>ID: {resData.id}</p>}
                {resData?.status && <p>STATUS: {resData.status}</p>}
                {resData?.result && <p>RESULT: {resData.result}</p>}
            </section>
        </main>
    )
}

export {App}
