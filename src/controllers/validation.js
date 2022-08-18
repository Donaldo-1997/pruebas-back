
function validateAttributes(name, surname, nickname, email, phone_number, date_of_Birth, address){
    if (!name || (typeof name !== "string") || (name.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!surname || (typeof surname !== "string") || (surname.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!nickname || (typeof nickname !== "string") || (nickname.length < 0) ){
        return "The User nickname must exist and must be a character string"
    } else if (!email || (typeof email !== "string") || (email.length < 0) ){
        return "The User email must exist and must be a character string"
    } else if (!phone_number || (typeof phone_number !== "string") ){
        return "The User phone number must exist and must be a string"
    } else if (!date_of_Birth || typeof date_of_Birth !== "string"){
        return "The User date of birth must exist and must be a date"
    } else if (!address || typeof address !== "string" || (address.length < 0)){
        return "The User address must exist and must be a character string"
    } else {
        return true;
    }
}


function validateAttribute(name, surname, phone_number, date_of_Birth, address){
    if (!name || (typeof name !== "string") || (name.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!surname || (typeof surname !== "string") || (surname.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!nickname || (typeof nickname !== "string") || (nickname.length < 0) ){
        return "The User nickname must exist and must be a character string"
    } else if (!phone_number || (typeof phone_number !== "number") ){
        return "The User phone number must exist and must be a number"
    } else if (!date_of_Birth || typeof date_of_Birth !== "string"){
        return "The User date of birth must exist and must be a date"
    } else if (!address || typeof address !== "string" || (address.length < 0)){
        return "The User address must exist and must be a character string"
    } else {
        return true;
    }
}

module.exports = {    
    validateAttributes,
    validateAttribute        
}