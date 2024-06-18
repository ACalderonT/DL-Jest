const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("should return a status code of 200 and the response should be an array with at least one object", async () => {
        const { statusCode: status, body: coffees } = await request(server).get("/cafes").send()

        expect(status).toBe(200);
        expect(coffees).toBeInstanceOf(Array);
        expect(coffees.length).toBeGreaterThan(0);
    })

    it("Should return a status code of 404 when trying to delete a coffee that doesn't exist", async () => {
        const id = Math.floor(Math.random() * 999);
        const jwt = "someJwt";

        const { statusCode: status } = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", jwt)
            .send();

        expect(status).toBe(404);
    })

    it("Should return a status code of 201 when is added a new coffee", async () => {
        const id = Math.floor(Math.random() * 9999);
        const newCoffee = { id, nombre: "New coffee" }

        const { statusCode: status } = await request(server).post("/cafes").send(newCoffee);

        expect(status).toBe(201);
    })

    it("Should return a status code of 400 if you try to update a coffee with different ids send in params and body", async () => {
        const paramsId = Math.floor(Math.random() * 100);
        const id = Math.floor(Math.random() * 999); 
        const updateCoffee = { id, nombre: "Coffee Updated" }

        const { statusCode: status } = await request(server).put(`/cafes/${paramsId}`).send(updateCoffee)

        expect(status).toBe(400)
    })
});
