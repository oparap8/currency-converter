const fetchCurrency = async () => {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await res.json()
    return data
}

const getAvailableCurrencies = async () => {
    try {
        const data = await fetchCurrency()
        const currencies = Object.keys(data.rates).filter(currency => currency !== "USD")
        // console.log(currencies)

        let currency_from = document.getElementById("from")
        currency_from.innerHTML = '<option value="USD">USD</option>'
        currencies.forEach(currency => {
            currency_from.innerHTML += `
            <option value="${currency}">${currency}</option>
            `
        })

        let currency_to = document.getElementById("to")
        currency_to.innerHTML = '<option value="USD">USD</option>'
        currencies.forEach(currency => {
            currency_to.innerHTML += `
            <option value="${currency}">${currency}</option>
            `
        })


    } catch (error) {
        console.log(error)
    }
}

const converter = async () => {

    try {
        const data = await fetchCurrency()
        const rates = data.rates
        
        // const currencies = {
        //     USD: 1.0,
        //     JPY: 113.5,
        //     EUR: 0.89,
        //     RUB: 74.36,
        //     GBP: 0.75
        // }

        let currency_from = document.getElementById("from").value
        let currency_to = document.getElementById("to").value
        let amount = document.getElementById("amount").value
        if (rates[currency_to] && rates[currency_from] ){
            const conv = (amount * rates[currency_to])/rates[currency_from]
            document.getElementById("result").value = (conv).toFixed(2)
        }
    } catch (error) {
        console.log(error)
    }
    
    
}

getAvailableCurrencies()





