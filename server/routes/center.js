import express from 'express';
import { response_200, response_201 } from '../utils/responseCodes.js';
import { addSport, createCenter, deleteCenter, getAllCenters, getCenter, removeSport } from '../controllers/Center.js';

export const centerRouter = express.Router();

centerRouter.post('/new', async (req, res)=>{
    const body = req.body;
    const newCenterId = await createCenter(body);

    return response_201(res, 'Center Created', {
        id: newCenterId
    });
});

centerRouter.get('/all', async (req, res)=>{
    const allCenters = await getAllCenters();
    
    return response_200(res, 'List of all centers', allCenters);
});

centerRouter.get('/:centerid', async (req, res)=>{
    const centerId = req.params.centerid;
    const centerData = await getCenter(centerId);

    return response_200(res, 'Center found!', centerData)
});

centerRouter.post('/add-sport', async (req, res)=>{
    const body = req.body;
    const newSportCenterId = await addSport(body.centerId, body.sportId);
    
    return response_201(res, 'Added sport to center', {
        id: newSportCenterId
    });
});

centerRouter.delete('/remove-sport/:sportcenterid', async (req, res)=>{
    const sportcenterId = req.params.sportcenterid;
    await removeSport(sportcenterId);
    
    return response_200(res, 'Sport removed from center!');
})

centerRouter.delete('/:centerid', async (req, res)=>{
    const centerId = req.params.centerid;
    await deleteCenter(centerId);

    return response_200(res, 'Center deleted!');
})
