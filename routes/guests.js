
/*
    Ruta: /api/Guests
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getGuests, crearGuest, actualizarGuest, borrarGuest } = require('../controllers/guests');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getGuests );
router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('wedding_id', 'El wedding_id es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearGuest 
);
router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarGuest
);

router.delete( '/:id',
    validarJWT,
    borrarGuest
);



module.exports = router;