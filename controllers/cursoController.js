// controllers/cursoController.js
let cursos = require('../data/cursosData');

// GET /api/cursos (con filtrado opcional por creditos)
exports.getAllCursos = (req, res) => {
    let resultado = cursos;
    if (req.query.creditos) {
        const creditosQuery = parseInt(req.query.creditos);
        resultado = cursos.filter(c => c.creditos === creditosQuery);
    }
    res.status(200).json({ status: 'success', data: resultado });
};

// GET /api/cursos/:id
exports.getCursoById = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.find(c => c.id === id);
    
    if (!curso) {
        return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
    }
    res.status(200).json({ status: 'success', data: curso });
};

// POST /api/cursos
exports.createCurso = (req, res) => {
    const { nombre, codigo, creditos } = req.body;
    
    // Validación de campos obligatorios
    if (!nombre || !codigo || !creditos) {
        return res.status(400).json({ status: 'fail', message: 'Faltan campos obligatorios: nombre, codigo y creditos' });
    }
    
    const newCurso = {
        id: cursos.length > 0 ? cursos[cursos.length - 1].id + 1 : 1,
        nombre,
        codigo,
        creditos: parseInt(creditos)
    };
    
    cursos.push(newCurso);
    res.status(201).json({ status: 'success', data: newCurso });
};

// PUT /api/cursos/:id
exports.updateCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const cursoIndex = cursos.findIndex(c => c.id === id);
    
    if (cursoIndex === -1) {
        return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
    }
    
    const { nombre, codigo, creditos } = req.body;
    
    cursos[cursoIndex] = {
        ...cursos[cursoIndex],
        nombre: nombre || cursos[cursoIndex].nombre,
        codigo: codigo || cursos[cursoIndex].codigo,
        creditos: creditos ? parseInt(creditos) : cursos[cursoIndex].creditos
    };
    
    res.status(200).json({ status: 'success', data: cursos[cursoIndex] });
};

// DELETE /api/cursos/:id
exports.deleteCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const cursoIndex = cursos.findIndex(c => c.id === id);
    
    if (cursoIndex === -1) {
        return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
    }
    
    cursos.splice(cursoIndex, 1);
    // Retorna 200 OK con mensaje de confirmación como se solicita
    res.status(200).json({ status: 'success', message: 'Curso eliminado correctamente' });
};