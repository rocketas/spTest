import bcrypt from 'bcrypt'
import {postgreSQLclient} from '../index.js';
import {findUserByUsernameAndPassword, findUserByUsernameAndPasswordHashed,findUserByGoogleID} from './helperFunctions'
import { google } from 'googleapis';

const express = require("express");
const app = express();

app.post('/users', function(req, res){
    const {
      first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description
    } = req.body
    console.log(req.body); 
  
    postgreSQLclient.query('INSERT INTO test (first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description], (error, results) => {
      if (error) {
        console.log('not inserted')
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
  });
  
  app.get('/users', function(req, res){
    postgreSQLclient.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {
      if (error) {
        console.log('data not received')
      }
      res.status(200).json(results.rows)
    })
  });
  
  app.get('/users/:id', function(req, res){
    const id = parseInt(req.params.id)
  
    postgreSQLclient.query('SELECT * FROM test WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log('data not received')
      }
      res.status(200).json(results.rows)
      console.log(res.body); 
    })
  });
  
  app.put('/users/:id',  (req, res, next) => {
    const {
      first_name, last_name, username, password, phone, job_title, googleid, address, city, state_name, zipcode, job_description, account_description
    } = req.body

    let searchParameter = ''
    let queryString = ''
    if(googleid !== undefined && googleid !== null){
        console.log('not undefined fam')
        searchParameter = googleid
        queryString = 'UPDATE test SET first_name = $1, last_name = $2, password = $3, phone = $4, job_title = $5, googleid = $6, address = $7, city = $8, state_name = $9, zipcode = $10, job_description = $11, account_description = $12 WHERE googleid = $13'
      }else{
  
        searchParameter = username
        queryString = 'UPDATE test SET first_name = $1, last_name = $2, password = $3, phone = $4, job_title = $5, googleid = $6, address = $7, city = $8, state_name = $9, zipcode = $10, job_description = $11, account_description = $12 WHERE username = $13'
      }

      postgreSQLclient.query(
        queryString,
        [first_name, last_name,password, phone, job_title, googleid, address, city, state_name, zipcode, job_description, account_description, searchParameter],
        (error, response) => {
          console.log('update response')
          console.log(response)
          if (error) {
            console.log('data not updated');
            console.log(error);
          }else{
            console.log('printing google id')
            console.log(googleid)
            if(googleid !== null){
              console.log("handling finding user with googleid")
              findUserByGoogleID(googleid, next).then(user =>{
                if(user === undefined){
                  console.log('user returned undefined')
                }else{
                  console.log('sending user..')
                  res.status(200).send(user)
                }
              })
            }else{
       
              findUserByUsernameAndPasswordHashed(username, password, next).then(user =>{
                console.log('printing updated user...')
                console.log(user)
                if(user === undefined){
                    res.send
                }else{
                    res.status(200).send(user)
                }
            })
            }
          }
        }
      )
       
      
  
  });
  
  app.delete('users', function(req, res){
      const id = parseInt(req.params.id)
    
      postgreSQLclient.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          console.log('data not deleted')
        }
        res.status(200).send(`User deleted with ID: ${id}`)
      })
  });

module.exports = app;