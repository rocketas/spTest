import {postgreSQLclient} from '../index.js' 
import bcrypt from 'bcrypt'

export let findUserByGoogleID = async (id, next) => {
    console.log(id)
    let response = undefined
    let checkAdminQuery = `SELECT * FROM test WHERE test.googleID = $1` 
    try{
        response = await postgreSQLclient.query(checkAdminQuery,[id])
    }catch(error){
        next(error)
    }
    if(response === undefined){
        return response
    }
    return response.rows[0]
}

export let findUserByUsernameAndPassword = async (username, password, next) => {
    
    console.log(username)
    console.log(password)
    let findUser = `SELECT * FROM Test WHERE Test.username = $1`
    let response;


    //checks if accout with username exists
    try{
        response = await postgreSQLclient.query(findUser,[username])
        if(response === undefined){
            return undefined
        }else if(response.rows.length === 0){
            return undefined
        }
    }catch(error){
        next(error)
    }
    console.log("if response is undefined should not be here")
    console.log(response.rows[0])

    //checks if password was correct
    try{
        let hashedPassword = response.rows[0].password
        let passwordCheck = await bcrypt.compare(password, hashedPassword)
        if(passwordCheck === true){
            return response.rows[0]
        }else{
            return undefined
        }
    }catch(error){
        console.log("there has been in error in helperFunctions findUserByUsernameAndPassword")
        next(error)
    }

}

export let findUserByUsernameAndPasswordHashed = async (username,password,next) => {
    console.log(username)
    console.log(password)
    let findUser = `SELECT * FROM Test WHERE Test.username = $1 and Test.password = $2`
    let response;


    //checks if accout with username exists
    try{
        response = await postgreSQLclient.query(findUser,[username, password])
        console.log("this sis response")
        console.log(response)
        if(response === undefined){
            return undefined
        }else if(response.rows.length === 0){
            return undefined
        }else{
            return response.rows[0]
        }
    }catch(error){
        next(error)
    }

}