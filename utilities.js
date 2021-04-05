
module.exports = {
    age:function age (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
    
        //2021 - 1984 = 35
        let age = today.getFullYear() - birthDate.getfullYear()
        let month = today.getMonth() - birthDate.getMonth
        let day = today.getDate() - birthDate.getDate()
    
        if (month < 0 || month == 0 && day < 0  ) {
    
            age = age - 1       
        }
    
        return age
    },

    createdAt:function x() {}
}

