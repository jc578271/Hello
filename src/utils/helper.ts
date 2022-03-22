export const groupedData = (db: any[]) => {
    let result = {}
    db.forEach(item => {
        let words = item.name.split(' ')
        let firstCharOfLastname = words[words.length-1][0]
        let temp = result[firstCharOfLastname.toUpperCase()]
        if (/^[0-9]+$/.test(firstCharOfLastname)) {
            result["Digit"] = temp ? [...temp, item] : [item]
        } else {
            result[firstCharOfLastname.toUpperCase()] = temp ? [...temp, item] : [item]
        }
    })
    let sortedResult = Object.keys(result).sort().reduce((obj, key) => {
        obj[key] = result[key].sort((a, b) => {
            let aWords = a.split(' '),
                bWords = b.split(' ')
            let aLastname = aWords[aWords.length - 1],
                bLastname = bWords[bWords.length - 1]
            return aLastname < bLastname ? -1 :1
        })
        return obj
    }, {})

    sortedResult = { "Digit": result["Digit"], ...sortedResult }
    return sortedResult
    
    // return db.filter(item => {
    //     let words = item.name.split(' ')
    //     let firstCharOfLastname = words[words.length-1][0]

    //     return char != 'Digit' 
    //     ? firstCharOfLastname.toLowerCase() == char.toLowerCase()
    //     : /^[0-9]+$/.test(firstCharOfLastname)
    // })
}

export const filterData = (searchInput: string, db: any[]) => {
    return db.filter(({name, number}) => {
        return number.toLowerCase().includes(searchInput.toLowerCase()) 
        || name.toLowerCase().includes(searchInput.toLowerCase())
    })
}