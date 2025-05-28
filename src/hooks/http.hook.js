import { useState, useCallback } from "react";

//этот кастомный хук может отправлять запросы, обрабатывать результаты и изменянть локально есостояние

export const useHttp = () => {
    const [loading, setLoading] = useState(false); //т.к. они чаще всего повторяются
    const [error, setError] = useState(null);

    //помещаем функцию, которая будет делать запросы
    const request = useCallback(
        //используем этот хук т.к. предполагаем, что эту функцию (request)
        //     мы будем в будущем помещать внутри нашего приложения, в том числе она может передаваться
        //     в внутрь дочерних компонентов и чтобы не вызывать лишних запросов в некоторых вариантах,
        //     лучше использовать мемоизированный вариант при помощи useCallback()
        async (
            url,
            method = "GET", //по умолчанию
            body = null,
            headers = {}, // "Content-Type": "application/json",,
        ) => {
            setLoading(true); //т.е. перед тем как отпраивить запрос мы вызываем загрузку
            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(
                        `Could not fetch ${url}, status: ${response.status}`,
                    );
                }
                const data = await response.json(); //чистые данные, которые пришли от API
                setLoading(false); //т.е. если код дашел до этого участка, данные загрузились, то зыгрузку убираем
                return data;
            } catch (error) {
                setLoading(false); //если что-то пошло не так, то выключаем загрузку
                setError(error.message); //и включаем ошибку => в стэйт запишется сообщение об ошибке
                throw error;
            }
        },
        [],
    );

    const clearError = useCallback(() => setError(null), []); //функция, которая просто будет чистить наши ошибки
    //функция нужна для того чтобы, если при нажатии на кнопку по добавлению персонажа мы попадем на персонажа которого
    // нет (ошибка 404), то мы не сможем переключиться на следующего персонажа. => надо затереть эту ошибку

    return {
        loading,
        request,
        error,
        clearError,
    };
};
