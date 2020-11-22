const express = require('express');
const router = express.Router();
const coreControllers=require('../controllers/core');
const imageCheck=require('../middleware/imagecheck');


//Route to evaluate different math problems
router.post('/sendImageToComplex',imageCheck,coreControllers.postComplex);

router.post('/sendImageToBodmas',imageCheck,coreControllers.postBodmas);

router.post('/sendImageToBodmasChecker',imageCheck,coreControllers.postBodmasChecker);

router.post('/sendImageToEqSolve',imageCheck,coreControllers.postEqSolve);

router.post('/sendImageToCoordinate',imageCheck,coreControllers.postCoordinate);

router.post('/sendImageToLinesCoordinate',imageCheck,coreControllers.postLinesCoordinate);

router.post('/sendImageToCircleCoordinate',imageCheck,coreControllers.postCircleCoordinate);

router.post('/sendImageToEllipseCoordinate',imageCheck,coreControllers.postEllipseCoordinate);

router.post('/sendImageToCalculusDerivative',imageCheck,coreControllers.postCalculusDerivative);

router.post('/sendImageToIndefIntegrals',imageCheck,coreControllers.postIndefIntegrals);

router.post('/sendImageTodefIntegrals',imageCheck,coreControllers.postDefIntegrals);

router.post('/sendImageTodoubleIntegrals',imageCheck,coreControllers.postDoubleIntegrals);

router.post('/sendImageTotripleIntegrals',imageCheck,coreControllers.postTripleIntegrals);

router.post('/sendImageTocalculusLimits',imageCheck,coreControllers.postCalculusLimits);

router.post('/sendImageTocalculusLDE',imageCheck,coreControllers.postCalculusLDE);

router.post('/sendImageToBinomialAny',imageCheck,coreControllers.postBinomialAny);

router.post('/sendImageToSeriesExpan',imageCheck,coreControllers.postSeriesExpan);

router.post('/sendImageToFourierExpan',imageCheck,coreControllers.postFourierExpan);

router.post('/sendImageToWordProb',imageCheck,coreControllers.postWordProb);










module.exports=router;