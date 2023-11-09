const express = require('express')
const app = express()
//prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/', async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  })
  res.json(user)
})

app.put('/:id', async (req, res) => {
  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  })
  res.json(updateUser)
})
app.delete('/:id', async (req, res) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  })
  res.json({ id: deleteUser.id })
})

app.listen(3000, () => {
  console.log('Servidor activo en puerto 3000')
})
