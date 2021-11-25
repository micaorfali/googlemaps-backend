const rutas = (app) =>{

const Marker = require('../models/markers');

const findAllMarkers = (req, res) =>{
    Marker.find((err, markers)=>{
        if(!err){
            console.log('GET /markers')
            res.send(markers)
        }
    })
}

const findOneMarker = (req, res) =>{
    Marker.findById(req.params.id, (err, marker)=>{
        if(!err){
            res.send(marker);
        }
    })
}

// ADD (POST)
const addMarker = (req, res) =>{
    const marker = new Marker({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        lat: req.body.lat,
        lng: req.body.lng,
        type: req.body.type
    })
    marker.save((err)=>{
        if(!err){
            console.log('Creado')
        } else{
            console.log('Hubo error', err)
        }
    })
    res.send(marker);
}

// EDIT (PUT) 
const editMarker = (req, res) => { 
    console.log("datos:",req.body)
    Marker.findById(req.params.id,(err, marker) => { // Recibe el parametro Id
        marker.nombre = req.body.nombre;
        marker.descripcion = req.body.descripcion;
        marker.lat = req.body.lat;
        marker.lng = req.body.lng;
        let categoria
        if(req.body.type == "Arte y Cultura"){
            categoria = "arteycultura";
        }else if(req.body.type == "Monumentos"){
            categoria = "monumentos"
        } else if(req.body.type == "Parques-Plazas"){
            categoria = "parques-plazas";
        }else if(req.body.type == "Gubernamentales"){
            categoria = "gubernamentales"
        }else if(req.body.type == "Compras"){
            categoria = "compras";
        }else if(req.body.type == "Gastronomía"){
            categoria = "gastronomia"
        }else if(req.body.type == "Patrimonio Nacional"){
            categoria = "patrimonionacional"
        }
        marker.type = categoria;
        marker.save((err) => {
            if(!err) {
                console.log('Actualizado')
            }else {
                console.log('Hubo error al actualizar', err)
            }
            res.send(marker)
        })
    }) 
}

// REMOVE (DELETE)
const deleteMarker = (req, res) => { 
    Marker.findById(req.params.id,(err, marker) => { 
        marker.remove((err) => {
            if(!err) {
                console.log('Eliminado')
            }else {
                console.log('Hubo error al eliminar', err)
            }
            res.send(marker)
        })
    })
}

app.get('/markers', findAllMarkers)
app.get('/markers/:id', findOneMarker)
app.post('/markers', addMarker)
app.put('/markers/:id', editMarker)
app.delete('/markers/:id', deleteMarker)
}

module.exports = rutas