import express from 'express'

import v1apiRoutes from './v1/index.js'

const router= express.Router()

router.use('/v1',v1apiRoutes);

export default router;