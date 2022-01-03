const Project = require('../models/projectModel')

const { getPostData } = require('../utils')

 
async function getProjects(req, res) {
    try {
        const projects = await Project.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(projects))
    } catch (error) {
        console.log(error)
    }
}

 
async function getProject(req, res, id) {
    try {
        const project = await Project.findById(id)

        if(!project) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'project Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(project))
        }
    } catch (error) {
        console.log(error)
    }
}

 
async function createProject(req, res) {
    try {
        
        const body = await getPostData(req)
  
        const { name, description, deadline } = JSON.parse(body)

        const project = {
            name,
            description,
            deadline
        }

        const newProject = await Project.create(project)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProject))  

    } catch (error) {
        console.log(error)
    }
}

 
async function updateProject(req, res, id) {
    try {
        const project = await Project.findById(id)

        if(!project) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'project Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, description, deadline } = JSON.parse(body)

            const projectData = {
                name: name || project.name,
                description: description || project.description,
                deadline: deadline || project.deadline
            }

            const updProject = await Project.update(id, projectData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProject)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

 
async function deleteProject(req, res, id) {
    try {
        const project = await Project.findById(id)

        if(!project) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Project Not Found' }))
        } else {
            await Project.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Project ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}