import { app } from "@shared/infra/http/app"
import request from "supertest"
import createConnection from "@shared/infra/typeorm"
import { hash } from "bcryptjs"
import { Connection } from "typeorm"
import { v4 as uuidV4 } from "uuid"

let connection: Connection
describe("Create category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
    const password = await hash("admin", 8)
    const id = uuidV4()
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
   values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxx')
  `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category teste",
        description: "Category teste",
      })
      .set({ Authorization: `Bearer ${refresh_token}` })

    expect(response.status).toBe(201)
  })
  it("should not be able to create a category when exist name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category teste",
        description: "Category teste",
      })
      .set({ Authorization: `Bearer ${refresh_token}` })

    expect(response.status).toBe(400)
  })
})
