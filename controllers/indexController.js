const sha1 = require('sha1');

const connection = require('../config/database');
const chefTable = "chef";
const plateTable = "plate";

const jwt = require('jsonwebtoken');
const secret = sha1('SecretKey');


function renderHome(req, res) {
    const chefQuery = `SELECT * FROM ${chefTable}`;

    connection.query(chefQuery, function(error, data) {
        if(error) {
            throw error;
        }

        res.render('index', { chefs: data });
    });
}

function renderChef(req, res, next) {
    const { chef_id } = req.params;

    if(isNaN(chef_id)) {
        // Redirect not found
        next();
    } 
    
    else {
        const chefQuery = `SELECT * FROM ${chefTable} WHERE chef_id = ${chef_id}`;
        const plateQuery = `SELECT * FROM ${plateTable} WHERE chef_id = ${chef_id}`;

        connection.query(chefQuery, function(chefsError, chefsData) {
            if(chefsError) {
                throw chefsError;
            } 

            if(!chefsData.length) {
                res.render('notfound', { error: `¡Ups! El chef al que intentas acceder no existe.` });
            } else {
                let [chef] = chefsData;

                connection.query(plateQuery, function(platesError, platesData) {
                    if(platesError) {
                        throw platesError;
                    }

                    chef.plates = platesData;
                    res.render('chef', { chef });
                });
            }
        });
    } 
}

function renderLogin(req, res) {
    res.render('login');
}

function renderRegister(req, res) {
    res.render('register');
}

function renderPlatesForm(req, res, next) {
    let plate = {};

    console.log(req.params.chef_id, req.params.plate_id);

    const { chef_id, plate_id } = req.params;
    if(isNaN(chef_id)) {
        //Redirect, avoid conflict with some image paths
        next();
    } else {
        const chefQuery = `SELECT * FROM ${chefTable} WHERE chef_id = ${chef_id}`;

        connection.query(chefQuery, function(chefError, chefData) {
            if(chefError) {
                throw chefError;
            }

            [chef] = chefData;

            if(!plate_id) {
                res.render('forms/plates', { chef, plate });
            } else {
                const plateQuery = `SELECT * FROM ${plateTable} WHERE plate_id = ${plate_id}`;

                connection.query(plateQuery, function(plateError, plateData) {
                    if(plateError) {
                        throw plateError;
                    }
        
                    [plate] = plateData;
                    res.render('forms/plates', { chef, plate });
                });
            }
        });
    }
} 

function renderNotFound(req, res) {
    res.render('notfound', { error: `¡Ups! La dirección a la que intentas acceder no existe.` });
}

module.exports = { 
    renderHome, renderChef, renderLogin, renderRegister, renderPlatesForm, renderNotFound 
};