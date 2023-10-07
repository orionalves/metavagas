import { Router } from 'express'
import { userRoutes } from '@/routes/userRoutes'
import { authRoutes } from '@/routes/authRoutes'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'
import { jobRoutesGet, jobRoutesPost } from '@/routes/jobRoutes'
import { cityRoutesPost, cityRoutesGet } from '@/routes/cityRoutes'
import { technologyRoutesGet, technologyRoutesPost } from '@/routes/technologyRoutes'

const routes = Router()

routes.use('/signup', userRoutes)
routes.use('/login', authRoutes)

routes.use(AuthMiddleware.handler)
routes.use('/jobs', jobRoutesGet)
routes.use('/jobs', jobRoutesPost)
// Não quero permitir criar cidades ou tecnologias, elas já deveriam estar implementadas no banco de dados.
routes.use('/city', cityRoutesPost)
routes.use('/city', cityRoutesGet)
routes.use('/tech', technologyRoutesPost)
routes.use('/tech', technologyRoutesGet)

export { routes }
