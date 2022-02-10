const { response } = require('express');
const bcrypt = require('bcryptjs');

const Guest = require('../models/guest');
const { generarJWT } = require('../helpers/jwt');


const getGuests = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ guests, total ] = await Promise.all([
        Guest
            .find({}, 'wedding_id nombre email role number wedding_zone confimation img')
            .skip( desde )
            .limit( 5 ),

            Guest.countDocuments()
    ]);


    res.json({
        ok: true,
        guests,
        total
    });

}

const crearGuest = async(req, res = response) => {
    try {
        const guest = new Guest( req.body );
        // Guardar guest
        await Guest.create(req.body);
        // Generar el TOKEN - JWT
        const token = await generarJWT( Guest.id );
        res.json({
            ok: true,
            guest,
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

const actualizarGuest = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el guest correcto

    const uid = req.params.id;


    try {

        const guestDB = await Guest.findById( uid );

        if ( !guestDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un guest por ese id'
            });
        }

        // Actualizaciones
        const { wedding_id, ...campos } = req.body;
        
        // campos.email = email;
        const guestActualizado = await Guest.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            guest: guestActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarGuest = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const guestDB = await Guest.findById( uid );

        if ( !guestDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un guest por ese id'
            });
        }

        await Guest.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Guest eliminado'
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
    getGuests,
    crearGuest,
    actualizarGuest,
    borrarGuest
}