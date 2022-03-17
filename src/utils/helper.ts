export const groupedData = (char: string, db: any[]) => {
    return db.filter(item => {
        let words = item.name.split(' ')
        let firstCharOfLastname = words[words.length-1][0]

        return char != 'Digit' 
        ? firstCharOfLastname.toLowerCase() == char.toLowerCase()
        : /^[0-9]+$/.test(firstCharOfLastname)
    })
}

export const filterData = (searchInput: string, db: any[]) => {
    return db.filter(({name, number}) => {
        return number.toLowerCase().includes(searchInput.toLowerCase()) 
        || name.toLowerCase().includes(searchInput.toLowerCase())
    })
}