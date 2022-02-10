const { response } = require('express');

const Coverage = require('../models/coverage');
const { generarJWT } = require('../helpers/jwt');


const getCoverages = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ coverages, total ] = await Promise.all([
        Coverage
            .find({}, 'user_id nombre price number_guest img details ')
            .skip( desde )
            .limit( 5 ),

            Coverage.countDocuments()
    ]);


    res.json({
        ok: true,
        coverages,
        total
    });

}


const crearCoverage= async(req, res = response) => {
    try {
        const coverage = new Coverage( req.body );
        // Guardar coverage
        await Coverage.create(req.body);
        // Generar el TOKEN - JWT
        const token = await generarJWT( Coverage.id );
        res.json({
            ok: true,
            coverage,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

const actualizarCoverage= async (req, res = response) => {

    // TODO: Validar token y comprobar si es el Coveragecorrecto

    const uid = req.params.id;


    try {

        const coverageDB = await Coverage.findById( uid );

        if ( !coverageDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un paquete por ese id'
            });
        }

        // Actualizaciones
        const { coverage_id, ...campos } = req.body;
        
        // campos.email = email;
        const coverageActualizado = await Coverage.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            coverage: coverageActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarCoverage= async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const coverageDB = await Coverage.findById( uid );

        if ( !coverageDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un paquete por ese id'
            });
        }

        await Coverage.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Coverageeliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


} 

module.exports = {getCoverages, crearCoverage, actualizarCoverage, borrarCoverage}