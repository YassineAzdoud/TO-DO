let projects = require('../data/projects')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(projects)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const project = projects.find((p) => p.id === id)
        resolve(project)
    })
}

function create(project) {
    return new Promise((resolve, reject) => {
        const newProject = {id: uuidv4(), ...project}
        projects.push(newProject)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/projects.json', projects);
        }
        resolve(newProject)
    })
}

function update(id, project) {
    return new Promise((resolve, reject) => {
        const index = projects.findIndex((p) => p.id === id)
        projects[index] = {id, ...project}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/projects.json', projects);
        }
        resolve(projects[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        projects = projects.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/projects.json', projects);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}