import { Router } from 'express'
import { userSignup, userUpdate } from '@/routes/userRoutes'
import { authRoutes } from '@/routes/authRoutes'
import { createJobs, searchJobs, getTrendsCities } from '@/routes/jobRoutes'
import { postCity, getCity } from '@/routes/cityRoutes'
import { postTechnology, getTechnology } from '@/routes/technologyRoutes'
import { getTrendTech } from '@/routes/techSearchRoutes'

const routes = Router()

routes.use(userSignup)
routes.use(authRoutes)
routes.use(getCity)
routes.use(getTechnology)
routes.use(getTrendTech)
routes.use(getTrendsCities)

routes.use(searchJobs)
routes.use(userUpdate)
routes.use(createJobs)
routes.use(postCity)
routes.use(postTechnology)

export { routes }
