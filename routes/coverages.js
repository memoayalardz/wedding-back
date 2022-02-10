
/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCoverages, crearCoverage, actualizarCoverage, borrarCoverage } = require('../controllers/coverages');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCoverages );


router.post( '/',
    [
        check('user_id', 'El user_id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('number_guest', 'El numero de invitados es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearCoverage 
);
router.put( '/:id',
    [
        validarJWT,
        check('user_id', 'El user_id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('number_guest', 'El numero de invitados es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCoverage
);

router.delete( '/:id',
    validarJWT,
    borrarCoverage
);



module.exports = router;