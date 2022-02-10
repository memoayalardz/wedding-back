const { response } = require('express');

const Wedding = require('../models/wedding');
const { generarJWT } = require('../helpers/jwt');


const getWeddings = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ weddings, total ] = await Promise.all([
        Wedding
            .find({}, 'date start_time coverage wedding_planer_id newlywed_name_1 newlywed_name_2 img')
            .skip( desde )
            .limit( 5 ),

            Wedding.countDocuments()
    ]);


    res.json({
        ok: true,
        weddings,
        total
    });

}

const crearWedding = async(req, res = response) => {
    try {
        const boda = new Wedding( req.body );
        // Guardar wedding
        await Wedding.create(req.body);
        // Generar el TOKEN - JWT
        const token = await generarJWT( Wedding.id );
        res.json({
            ok: true,
            boda,
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

const actualizarWedding = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el wedding correcto

    const uid = req.params.id;


    try {

        const weddingDB = await Wedding.findById( uid );

        if ( !weddingDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un wedding por ese id'
            });
        }

        // Actualizaciones
        const { wedding_id, ...campos } = req.body;
        
        // campos.email = email;
        const weddingActualizado = await Wedding.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            wedding: weddingActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarWedding = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const weddingDB = await Wedding.findById( uid );

        if ( !weddingDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un wedding por ese id'
            });
        }

        await Wedding.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Wedding eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


} 



module.exports = {
    getWeddings,
    crearWedding,
    actualizarWedding,
    borrarWedding
}