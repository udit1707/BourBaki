const express = require('express');
const router = express.Router();
const coreControllers=require('../controllers/core');
const imageCheck=require('../middleware/imagecheck');


router.post('/sendImageToComplex',imageCheck,coreControllers.postComplex);

router.post('/sendImageToBodmas',imageCheck,coreControllers.postBodmas);

router.post('/sendImageToEqSolve',imageCheck,coreControllers.postEqSolve);

router.post('/sendImageToCoordinate',imageCheck,coreControllers.postCoordinate);

router.post('/sendImageToLinesCoordinate',imageCheck,coreControllers.postLinesCoordinate);

router.post('/sendImageToCircleCoordinate',imageCheck,coreControllers.postCircleCoordinate);

router.post('/sendImageToEllipseCoordinate',imageCheck,coreControllers.postEllipseCoordinate);

router.post('/sendImageToCalculusDerivative',imageCheck,coreControllers.postCalculusDerivative);

router.post('/sendImageToIndefIntegrals',imageCheck,coreControllers.postIndefIntegrals);

router.post('/sendImageTodefIntegrals',imageCheck,coreControllers.postDefIntegrals);

router.post('/sendImageTodoubleIntegrals',imageCheck,coreControllers.postDoubleIntegrals);








module.exports=router;