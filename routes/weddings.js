
/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getWeddings, crearWedding, actualizarWedding, borrarWedding } = require('../controllers/weddings');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getWeddings );


router.post( '/',
    [
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('coverage', 'El paquete es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearWedding 
);
router.put( '/:id',
    [
        validarJWT,
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('coverage', 'El paquete es obligatorio').not().isEmpty(),
        check('newlywed_name_one', 'El nombre es obligatorio').not().isEmpty(),
        check('newlywed_name_two', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarWedding
);

router.delete( '/:id',
    validarJWT,
    borrarWedding
);



module.exports = router;