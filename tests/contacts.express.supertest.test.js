import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import { store } from "../src/store/memory.store";
const app = createApp();
describe("Items API", () => {
    beforeEach(() => {
        store.clear();
    });
    it("GET / → 200", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
    });
    it("GET /items → []", async () => {
        const res = await request(app).get("/items");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("POST /items → 201, then GET /items/1 → 200", async () => {
        const create = await request(app).post("/items").send({
            type: "pc",
            price: 1000,
            state: "new",
            quantity: 2
        });
        expect(create.status).toBe(201);
        expect(create.body.id).toBe(1);
        const get = await request(app).get("/items/1");
        expect(get.status).toBe(200);
        expect(get.body.type).toBe("pc");
    });
    it("PUT /items/1 → 200 update", async () => {
        await request(app).post("/items").send({
            type: "monitor",
            price: 199.9,
            state: "used",
            quantity: 10
        });
        const put = await request(app).put("/items/1").send({
            type: "monitor",
            price: 149.9,
            state: "refurbished",
            quantity: 8
        });
        expect(put.status).toBe(200);
        expect(put.body.price).toBe(149.9);
        expect(put.body.state).toBe("refurbished");
    });
    it("DELETE /items/1 → 200 then GET 404", async () => {
        await request(app).post("/items").send({
            type: "keyboard",
            price: 49,
            state: "new",
            quantity: 20
        });
        const del = await request(app).delete("/items/1");
        expect(del.status).toBe(200);
        const get = await request(app).get("/items/1");
        expect(get.status).toBe(404);
    });
    it("400: POST /items invalid body", async () => {
        const res = await request(app).post("/items").send({
            type: "",
            price: -5,
            state: "x",
            quantity: -1
        });
        expect(res.status).toBe(400);
    });
    it("400: invalid JSON", async () => {
        const res = await request(app)
            .post("/items")
            .set("Content-Type", "application/json")
            .send("{ invalid");
        expect(res.status).toBe(400);
    });
    it("404: GET /items/999", async () => {
        const res = await request(app).get("/items/999");
        expect(res.status).toBe(404);
    });
    it("405: PATCH /items", async () => {
        const res = await request(app).patch("/items");
        expect(res.status).toBe(405);
    });
    it("405: PATCH /items/1", async () => {
        const res = await request(app).patch("/items/1");
        expect(res.status).toBe(405);
    });
    it("400: PUT /items/1 invalid body", async () => {
        await request(app).post("/items").send({
            type: "pc",
            price: 1000,
            state: "new",
            quantity: 1
        });
        const res = await request(app).put("/items/1").send({
            type: "",
            price: "NaN",
            state: "broken",
            quantity: 0
        });
        expect(res.status).toBe(400);
    });
});
