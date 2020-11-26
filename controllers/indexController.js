const sha1 = require('sha1');

const connection = require('../config/database');
const chefsTable = "chefs";
const platesTable = "plates";

const jwt = require('jsonwebtoken');
const secret = sha1('SecretKey');


function renderHome(req, res) {
    const chefsQuery = `SELECT * FROM ${chefsTable}`;

    connection.query(chefsQuery, function(error, data) {
        if(error) {
            throw error;
        }

        res.render('index', { chefs: data });
    });
}

function renderChef(req, res, next) {
    const { id } = req.params;

    if(isNaN(id)) {
        next();
    } 
    
    else {
        const chefsQuery = `SELECT * FROM ${chefsTable} WHERE id = ${id}`;
        const platesQuery = `SELECT * FROM ${platesTable} WHERE chef_id = ${id}`;

        connection.query(chefsQuery, function(chefsError, chefsData) {
            if(chefsError) {
                throw chefsError;
            }

            if(!chefsData.length) {
                res.render('notfound', { error: `¡Ups! El chef al que intentas acceder no existe.` });
            } else {
                let [chef] = chefsData;

                connection.query(platesQuery, function(platesError, platesData) {
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

function renderPlatesForm(req, res) {
    let plate = {};
 
    if(!Object.values(req.params).length) {
        res.render('forms/plates', { plate });
    } else {
        const { id } = req.params;
        const platesQuery = `SELECT * FROM ${platesTable} WHERE id = ${id}`;

        connection.query(platesQuery, function(error, data) {
            if(error) {
                throw error;
            }

            [plate] = data;
            res.render('forms/plates', { plate });
        });
    }
} 

function renderNotFound(req, res) {
    res.render('notfound', { error: `¡Ups! La dirección a la que intentas acceder no existe.` });
}

module.exports = { 
    renderHome, renderChef, renderPlatesForm, renderNotFound 
};