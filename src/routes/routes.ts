import { Router } from 'express'
import { userSignup, userUpdate } from '@/routes/userRoutes'
import { authRoutes } from '@/routes/authRoutes'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'
import { createJobs, searchJobs, getTrendsCities } from '@/routes/jobRoutes'
import { cityRoutesPost, cityRoutesGet } from '@/routes/cityRoutes'
import { technologyRoutesGet, technologyRoutesPost } from '@/routes/technologyRoutes'
import { techSearchRoutesGet } from '@/routes/techSearchRoutes'

const routes = Router()

routes.use(userSignup)
routes.use(authRoutes)
routes.use(technologyRoutesGet)
routes.use(getTrendsCities)
routes.use(cityRoutesGet)

routes.use(AuthMiddleware.handler)
routes.use(searchJobs)
routes.use(userUpdate)
routes.use(techSearchRoutesGet)
routes.use(createJobs)

// Não queria permitir criar cidades ou tecnologias, elas já deveriam estar implementadas no banco de dados.
routes.use(cityRoutesPost)
routes.use(technologyRoutesPost)

export { routes }
