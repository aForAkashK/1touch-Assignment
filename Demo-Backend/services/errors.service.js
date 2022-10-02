const errorHandlerService = {
    userErrorHandler: (error) => {
        const errors = []
        const errorFeilds = ["name", "email", "password"]
        if (error && error.errors) {
            errorFeilds.forEach(field => {
                if (error.errors && error.errors[field]) {
                    errors.push(error.errors[field].message)
                }
            })
        }
         return errors
        
    }
}

module.exports = errorHandlerService