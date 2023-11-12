import LeasesController from '../controllers/leases.js';
import express from 'express';

const router = express.Router();

router.post('/', LeasesController.createLeaseListing);
router.patch('/:id', LeasesController.updateLeaseListing);
router.delete('/:id', LeasesController.deleteLeaseListing);

router.get('/:id', LeasesController.getLeaseListingById);
router.get('/', LeasesController.getAllLeaseListings);
router.get('/user/:userId', LeasesController.getLeaseListingsByUserId);

export default router;