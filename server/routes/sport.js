import express from 'express';
import { createSport, deleteSport, getAllSports, getSport } from '../controllers/Sport.js';
import { response_200, response_201 } from '../utils/responseCodes.js';

export const sportRouter = express.Router();

sportRouter.post('/new', async (req, res)=>{
    const body = req.body;
    const newSportId = await createSport(body);

    return response_201(res, 'Sport Created', {
        id: newSportId
    });
});

sportRouter.get('/all', async (req, res)=>{
    const allSports = await getAllSports();
    
    return response_200(res, 'List of all sports', allSports);
});

sportRouter.get('/:sportid', async (req, res)=>{
    const sportId = req.params.sportid;
    const sportData = await getSport(sportId);

    return response_200(res, 'Sport found!', sportData)
});

sportRouter.delete('/:sportid', async (req, res)=>{
    const sportId = req.params.sportid;
    await deleteSport(sportId);

    return response_200(res, 'Sport deleted!');
})
