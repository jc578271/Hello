import { RawContact } from './../types';
export const groupedData = (db: RawContact[]) => {
    let result = {}
    db.forEach(item => {
        let words = item.fullName.split(' ')
        let firstCharOfLastname = words[words.length - 1][0] || ""
        let temp = result[firstCharOfLastname.toUpperCase()]
        if (/^[0-9]+$/.test(firstCharOfLastname)) {
            result["Digit"] = temp ? [...temp, item] : [item]
        } else {
            result[firstCharOfLastname.toUpperCase()] = temp ? [...temp, item] : [item]
        }
    })
    let sortedResult = Object.keys(result).sort().reduce((obj, key) => {
        obj[key] = result[key].sort((a, b) => {
            let aWords = a.fullName.split(' '),
                bWords = b.fullName.split(' ')
            let aLastname = aWords[aWords.length - 1],
                bLastname = bWords[bWords.length - 1]
            return aLastname < bLastname ? -1 : 1
        })
        return obj
    }, {})

    if(result["Digit"]) sortedResult = { "Digit": result["Digit"], ...sortedResult }
    return sortedResult
}

export const filterData = (searchInput: string, db: RawContact[]) => {
    // console.log("helper:", db)
    return db.filter(({fullName, phones}) => {
        return phones.some(item => item.toLowerCase().includes(searchInput.toLowerCase()))
        || fullName.toLowerCase().includes(searchInput.toLowerCase())
    })
}